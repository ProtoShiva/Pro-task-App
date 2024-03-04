import express from "express"
import connectDB from "./db/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import bcrypt from "bcrypt"
import User from "./models/User.js"
import Check from "./models/Check.js"
import jwt from "jsonwebtoken"
import "dotenv/config"
const app = express()
const port = 3000

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true
  })
)

const bcryptSalt = bcrypt.genSaltSync(10)

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt)
    })
    res.json(userDoc)
  } catch (error) {
    res.status(422).json(error)
  }
})

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body
  const userDoc = await User.findOne({ email })
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        process.env.jwtSecret,
        {},
        (err, token) => {
          if (err) throw err
          res.cookie("jwtToken", token).json(userDoc)
        }
      )
    } else {
      res.status(422).json("pass not ok")
    }
  } else {
    res.json("not found")
  }
})

app.get("/api/profile", (req, res) => {
  const { jwtToken } = req.cookies
  if (jwtToken) {
    jwt.verify(jwtToken, process.env.jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      const { name, email, _id } = await User.findById(userData.id)
      res.json({ name, email, _id })
    })
  }
})

app.post("/api/logout", (req, res) => {
  res.cookie("jwtToken", "").json(true)
})

app.post("/api/newcards", (req, res) => {
  const { jwtToken } = req.cookies
  const { title, priority, duedate, inputs, checked } = req.body
  jwt.verify(jwtToken, process.env.jwtSecret, {}, async (err, userData) => {
    if (err) throw err
    const cardDoc = await Check.create({
      owner: userData.id,
      title,
      priority,
      duedate,
      inputs,
      checked
    })
    res.json(cardDoc)
  })
})

app.get("/api/cards", (req, res) => {
  const { jwtToken } = req.cookies
  if (jwtToken) {
    jwt.verify(jwtToken, process.env.jwtSecret, {}, async (err, userData) => {
      const { id } = userData
      res.json(await Check.find({ owner: id }))
    })
  }
})

app.get("/api/sortedcard/:", async (req, res) => {
  try {
    const { userId } = req.params
    const { filter } = req.body
    const cards = await Check.find({ filter, _id: userId }).exec()
    res.send(cards)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Something went wrong.")
  }
})

app.get("/api/cards/:id", async (req, res) => {
  const { id } = req.params
  res.json(await Check.findById(id))
})
app.put("/api/card/:id", async (req, res) => {
  const { jwtToken } = req.cookies
  const { id } = req.params
  const { title, priority, duedate, inputs } = req.body

  jwt.verify(jwtToken, process.env.jwtSecret, {}, async (err, userData) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error verifying JWT" })
    }

    try {
      const placeDoc = await Check.findById(id)

      if (!placeDoc) {
        return res.status(404).json({ message: "Card not found" })
      }

      if (userData.id !== placeDoc.owner.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this card" })
      }

      placeDoc.set({
        title,
        priority,
        duedate,
        inputs
      })

      await placeDoc.save()

      res.json("ok")
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error updating card" })
    }
  })
})

app.put("/api/status/:id", async (req, res) => {
  const { jwtToken } = req.cookies
  const { id } = req.params
  const { status } = req.body

  jwt.verify(jwtToken, process.env.jwtSecret, {}, async (err, userData) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error verifying JWT" })
    }

    try {
      const placeDoc = await Check.findById(id)

      if (!placeDoc) {
        return res.status(404).json({ message: "Card not found" })
      }

      if (userData.id !== placeDoc.owner.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this card" })
      }

      placeDoc.set({
        status
      })

      await placeDoc.save()
      const updatedCard = await Check.findOne({ _id: id })

      res.status(200).json(updatedCard)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error updating card" })
    }
  })
})

app.put("/api/userchange/:id", async (req, res) => {
  const { name, password } = req.body
  const { id } = req.params
  const user = await User.findById(id)
  try {
    if (name) {
      user.name = name
    }
    if (password) {
      user.password = bcrypt.hashSync(password, bcryptSalt)
    }
    await user.save()
    res.json({ msg: "User updated successfully" })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})
app.delete("/api/user_cards/:id", async (req, res) => {
  const { id } = req.params
  try {
    const result = await Check.findByIdAndDelete(id)

    if (!result) {
      return res.status(404).send("Card with the given ID was not found.")
    }

    res.send(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Something went wrong.")
  }
})

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
