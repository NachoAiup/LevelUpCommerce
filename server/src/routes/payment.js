const Router = require("express");

const router = Router();

const luhnCheck = (num) => {
  let arr = (num + "")
    .split("")
    .reverse()
    .map((x) => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
    0
  );
  sum += lastDigit;
  return sum % 10 === 0;
};

router.post("/", async (req, res) => {
  const { cardNumber, month, year, cvv } = req.body;
  const expiryDate = year + "-" + month + "-01";
  const currentDate = new Date().toISOString().split("T")[0];
  const isAmericanExpress =
    cardNumber.slice(0, 2) === "34" || cardNumber.slice(0, 2) === "37";

  if (cardNumber.length < 16 || cardNumber.length > 19) {
    return res
      .status(400)
      .send({ message: "Card number must be between 16 and 19 digits long" })
      .end();
  }
  if (currentDate > expiryDate) {
    return res
      .status(400)
      .send({ message: "The expiry date must be after present time" })
      .end();
  }
  if (isAmericanExpress && cvv.length !== 4) {
    return res
      .status(400)
      .send({ message: "American Express cards CVV must have 4 digits long" })
      .end();
  }
  if (!isAmericanExpress && cvv.length !== 3) {
    return res
      .status(400)
      .send({ message: "CVV must have 3 digits long" })
      .end();
  }
  if (!luhnCheck(cardNumber)) {
    return res.status(400).send({ message: "Card number is not valid" }).end();
  }
  res.status(200).send({ message: "Payment accepted!" }).end();
});

module.exports = router;
