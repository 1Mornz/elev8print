import sgMail from "@sendgrid/mail";

let initialized = false;

function ensureSendGrid() {
  if (!initialized) {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("Missing SENDGRID_API_KEY in environment");
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    initialized = true;
  }
}

export default new Proxy(sgMail, {
  get(target, prop, receiver) {
    ensureSendGrid();
    return Reflect.get(target, prop, receiver);
  },
});
