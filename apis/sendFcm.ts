import axios from "axios";

// Define your FCM server key
const serverKey: string = "AAAAbcVwtbU:APA91bET7ksps569G0nG29zoQXlRSf0jcRCsmGMVaimUz9qWl9Gf51Z1qirKwIfPr-Zjr2tiee8ftel-GoMoHer1_uUyMPSdKLlDzoES08CCmr8zmMKpK5lC6CjY0AeGHKpAuHD_bD6R";

interface IMessage {
  notification: {
    title: string;
    body: string;
  };
  to: string;
}

async function sendFCMMessage(topic: string, title: string, body: string): Promise<void> {
  // Define the message body
  // console.log(`/topics/${topic}`);
  const message: IMessage = {
    notification: {
      title,
      body,
    },
    to: `/topics/${topic}`,
  };

  const messageJson = JSON.stringify(message);

  try {
    const response = await axios.post("https://fcm.googleapis.com/fcm/send", messageJson, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `key=${serverKey}`,
      },
    });

    // Handle the response
    if (response.status === 200) {
      // console.log(`FCM message sent to topic ${topic}!`);
    } else {
      // console.log(`Error sending FCM message to topic ${topic}: ${response.data}`);
    }
  } catch (error) {
    // console.log(`Error sending FCM message to topic ${topic}: ${error}`);
  }
}

export default sendFCMMessage;
