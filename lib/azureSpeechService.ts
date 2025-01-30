import * as sdk from "microsoft-cognitiveservices-speech-sdk"

const speechConfig = sdk.SpeechConfig.fromSubscription(
  process.env.NEXT_PUBLIC_SPEECH_KEY!,
  process.env.NEXT_PUBLIC_REGION!,
)
export async function recognizeSpeech(): Promise<string> {
  return new Promise((resolve, reject) => {
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput()
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig)

    recognizer.recognizeOnceAsync(
      (result) => {
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
          resolve(result.text)
        } else {
          reject("Speech recognition failed or was canceled.")
        }
        recognizer.close()
      },
      (error) => {
        reject(error)
        recognizer.close()
      },
    )
  })
}

