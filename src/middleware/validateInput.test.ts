import { Request, Response } from "express"
import { beforeEach, describe, expect, it, vi } from "vitest"
import z from "zod"
import { validateInput } from "./validateInput"

const schema = z.object({
	body: z.object({
		name: z.string(),
		age: z.number(),
	}),
})

describe("validateInput middleware", () => {
	let mockRequest: Partial<Request>
	let mockResponse: Partial<Response>
	const nextFunction = vi.fn()

	beforeEach(() => {
		mockRequest = {}
		mockResponse = {}
		nextFunction.mockClear()
	})

	it("is good", () => {
		nextFunction()
		expect(true).toBe(true)
	})

	it("should call next method if the request body is valid", async () => {
		mockRequest.body = {
			name: "John Doe",
			age: 22,
		}

		const validateInputPromise = validateInput(schema)(
			mockRequest as Request,
			mockResponse as Response,
			nextFunction
		)

		await expect(validateInputPromise).resolves.toBeUndefined()
		expect(nextFunction).toHaveBeenCalled()
	})

	it("should throw an error if the request body is invalid", async () => {
		mockRequest.body = {
			name: "John Doe",
			age: "not a number",
		}

		const validateInputPromise = validateInput(schema)(
			mockRequest as Request,
			mockResponse as Response,
			nextFunction
		)

		await expect(validateInputPromise).rejects.toThrowError()
	})
})
