import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Login from "./Login"

const testValue = {
    username: "john",
    password:"alex12345"
}

jest.mock("axios", () => ({
    __esModule: true,
    default: {
        get: () => ({
            data:{id:1,name:"John"}
        })
    }
}))

describe("<Login/>", () => {
    test("username input should be rendered", () => {
        render(<Login />)
        const userInputEl = screen.getByPlaceholderText(/username/i)
        expect(userInputEl).toBeInTheDocument()
    })

      test("password input should be rendered", () => {
        render(<Login />)
        const passwordInputEl = screen.getByPlaceholderText(/password/i)
        expect(passwordInputEl).toBeInTheDocument()
      })

     test("button  should be rendered", () => {
        render(<Login />)
        const buttonEl = screen.getByRole("button")
        expect(buttonEl).toBeInTheDocument()
     })


     test("button content should not be loading..", () => {
        render(<Login />)
        const buttonEl = screen.getByRole("button")
        expect(buttonEl).not.toHaveTextContent("loading...")
     })

       test("password input should be empty", () => {
        render(<Login />)
        const passwordInputEl = screen.getByPlaceholderText(/password/i)
        expect(passwordInputEl.value).toBe("")
       })

       test("username input should be empty", () => {
        render(<Login />)
        const userInputEl = screen.getByPlaceholderText(/username/i)
        expect(userInputEl.value).toBe("")
       })

     test("button should be disabled", () => {
        render(<Login />)
        const buttonEl = screen.getByRole("button")
        expect(buttonEl).toBeDisabled()
     })


     test("error element should not be visisble", () => {
        render(<Login />)
        const errorEl = screen.getByTestId("error")
        expect(errorEl).not.toBeVisible()
     })

      test("username input should be change", () => {
        render(<Login />)
          const userInputEl = screen.getByPlaceholderText(/username/i)
          userEvent.type(userInputEl,testValue.username)
        expect(userInputEl.value).toBe(testValue.username)
      })
        test("password input should be change", () => {
        render(<Login />)
          const passwordInputEl = screen.getByPlaceholderText(/password/i)
          userEvent.type(passwordInputEl,testValue.password)
        expect(passwordInputEl.value).toBe(testValue.password)
        })

        test("button should not be disabled when inputs exists", () => {
        render(<Login />)
            const buttonEl = screen.getByRole("button")
            const userInputEl = screen.getByPlaceholderText(/username/i)
            const passwordInputEl = screen.getByPlaceholderText(/password/i)
            userEvent.type(userInputEl, testValue.username)
               userEvent.type(passwordInputEl,testValue.password)
        expect(buttonEl).not.toBeDisabled()
     })
     test("button should have content loading... when form is submitting", () => {
        render(<Login />)
            const buttonEl = screen.getByRole("button")
            const userInputEl = screen.getByPlaceholderText(/username/i)
            const passwordInputEl = screen.getByPlaceholderText(/password/i)
            userEvent.type(userInputEl, testValue.username)
               userEvent.type(passwordInputEl,testValue.password)
            userEvent.click(buttonEl)
             expect(buttonEl).toHaveTextContent("loading...")
     })

        test("button content should not be loading after submission", async () => {
        render(<Login />)
            const buttonEl = screen.getByRole("button")
            const userInputEl = screen.getByPlaceholderText(/username/i)
            const passwordInputEl = screen.getByPlaceholderText(/password/i)
            userEvent.type(userInputEl, testValue.username)
            userEvent.type(passwordInputEl, testValue.password)

            userEvent.click(buttonEl)

            await waitFor(() => {
                expect(buttonEl).not.toHaveTextContent("loading...")
            })
        })


        test("button content should not", async () => {
        render(<Login />)
            const buttonEl = screen.getByRole("button")
            const userInputEl = screen.getByPlaceholderText(/username/i)
            const passwordInputEl = screen.getByPlaceholderText(/password/i)
            userEvent.type(userInputEl, testValue.username)
            userEvent.type(passwordInputEl, testValue.password)
            userEvent.click(buttonEl)
            const userTest = await screen.findByText("John")
            expect(userTest).toBeInTheDocument()
            await waitFor(async () => {
                expect(buttonEl).not.toHaveTextContent("loading...")

            })

     })



  })