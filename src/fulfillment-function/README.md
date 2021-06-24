# ccai-sandbox-starter-fulfillment

This contains the fulfillment used for the ccai-sandbox-starter Dialogflow Agent.

# Install dependencies

You will need to run `npm install` twice - once in the root dir, and once in the `/functions` dir. The root dir contains all linting and rules, whereas the `/functions` contains packages needed for function execution.

# Modifying

The code is contained in `/functions/src`, written in TypeScript.

# Deploying

## Firebase Function

It's deployed to a firebase function by running `firebase deploy --only functions` from this directory (**not** the `functions` directory).

## Dialogflow Inline Editor

If you want to compile the code locally and then copy/paste into the Dialogflow Inline editor, that's easily done. Just run `npm run build` from inside the `/functions` folder. The outputted `index.js` is the compiled code in vanilla-JS.
