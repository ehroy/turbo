const TURBO = require("./lib/otp");
const sleep = require("delay");
(async () => {
  while (true) {
    let dataTurbo;
    let smsasu;
    let otpCodeTurbo;
    const sms = new TURBO("c657c69a4cdde52eecc8feeb6f9a886b");

    do {
      try {
        await sleep(1000);
        dataTurbo = await sms.GetNumber("51");
      } catch (err) {
        console.log(`Gagal Mendapatkan Nomer ${err}`);
        await sleep(5000);
        continue;
      }
      await sleep(5000);
    } while (dataTurbo.success === false);

    let { order_id, number } = dataTurbo.data.data;
    console.log("succes get number", number);
    console.log("Try get message");
    try {
      do {
        try {
          otpCodeTurbo = await sms.GetMessage(order_id);

          if (count === 60) {
            await sms.GetCancel(order_id);
          }
          await sleep(1000);
          count++;
        } catch (error) {
          break;
        }
        // console.log(otpCodeTurbo.data.data[0]);
      } while (otpCodeTurbo.data.data[0].sms === null);
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
        console.log("Message =>", parse);
      } catch (error) {
        console.log(error);
        console.log("Cancel Phone Number");
      }
    }
  }
})();
