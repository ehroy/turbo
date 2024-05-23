const TURBO = require("./lib/otp");
const sleep = require("delay");
const inquirer = require("inquirer");
(async () => {
  let choicess = [];
  const sms = new TURBO("c657c69a4cdde52eecc8feeb6f9a886b");
  const services = await sms.GetServis();
  services.data.data.forEach(async (element, index) => {
    await choicess.push(element);
  });
  choicess.push("cancel");
  let selectvoucher = await inquirer
    .prompt([
      {
        type: "rawlist",
        choices: choicess,
        name: "selected",
        message: "Select Your Choices ?",
      },
    ])
    .then((answers) => {
      return answers.selected;
    });

  if (selectvoucher == "cancel") {
    console.log("[CANCELED]");
    process.exit(0);
  }
  let obj = choicess.find((o, i) => {
    if (o.name.includes(selectvoucher)) {
      return choicess[i];
    }
  });

  while (true) {
    let id;
    let dataTurbo;
    let smsasu;
    let otpCodeTurbo;

    do {
      try {
        await sleep(1000);
        dataTurbo = await sms.GetNumber(obj.id);
      } catch (err) {
        console.log(`Gagal Mendapatkan Nomer ${err}`);
        await sleep(5000);
        continue;
      }
      await sleep(5000);
    } while (dataTurbo.success === false);

    let { order_id, number } = dataTurbo.data.data;
    id = order_id;
    console.log("succes get number", number, "order id", id);
    console.log("Try get message");
    let count = 0;
    try {
      do {
        try {
          otpCodeTurbo = await sms.GetMessage(id);

          if (count === 60) {
            await sms.GetCancel(id);
          }
          await sleep(1000);
          count++;
        } catch (error) {
          break;
        }
        process.stdout.write(`Waiting Otp [ ${count} second ]...\r`);
      } while (
        otpCodeTurbo.data.data[0].sms === null ||
        otpCodeTurbo.data.data[0].sms === "null"
      );
      smsasu = otpCodeTurbo.data.data[0];
    } catch (error) {
      await sms.GetCancel(order_id);
      console.log("Skip Phone Number");
      continue;
    }
    if (otpCodeTurbo.data.data[0].status === "0") {
      console.log("Cancel Phone Number");
      // await sms.GetCancel(order_id);
      continue;
    } else {
      try {
        const parse = JSON.parse(smsasu.sms);

        console.log("Message =>", parse[0].sms);
      } catch (error) {
        await sms.GetCancel(id);
        console.log(error);
        console.log("Cancel Phone Number");
      }
    }
  }
})();
