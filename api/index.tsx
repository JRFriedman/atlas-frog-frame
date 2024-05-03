import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { handle } from 'frog/vercel'

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
})

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const input = inputText || buttonValue
  return c.res({
    image: (
      <img
        src="https://i.ibb.co/T88t6kW/Screen-Recording-2024-05-02-at-8-08-01-PM.gif" // Replace with your image URL
        alt="Image" 
        style={{ width: '100%', height: 'auto' }} // Adjust image size as needed
      />
    ),
    intents: [
      <TextInput placeholder="Ask Atlas..." />,
      <Button.Link href="https://i.ibb.co/T88t6kW/Screen-Recording-2024-05-02-at-8-08-01-PM.gif">Ideas</Button.Link>, // Replace URL with desired external link
      <Button.Link href="https://i.ibb.co/T88t6kW/Screen-Recording-2024-05-02-at-8-08-01-PM.gif">Conversations</Button.Link>, // Replace URL with desired external link
      <Button.Link href="https://i.ibb.co/T88t6kW/Screen-Recording-2024-05-02-at-8-08-01-PM.gif">Questions</Button.Link>, // Replace URL with desired external link
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)