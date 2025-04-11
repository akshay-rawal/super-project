
  

const forgotPasswordVerification = (username, verificationLink) => {
    return {
      body: {
        name: username,
        intro: `Hi ${username} you recently requested to reset your password.`,
        action: [
          {
            instructions: `Hello ${username} please click the button below to reset your password`,
            button: {
              color: "#22BC66",
              text: "Reset password",
              link: verificationLink,
            },
          },
          // yeh extra information hai(optional hai)
          {
            instructions:
              "To read our frequently asked questions, please click here:",
            button: {
              text: "Read our FAQ",
              link: "https://fullBackend.com/faq",
            },
          },
        ],
      },
    };
  };

  export {forgotPasswordVerification}