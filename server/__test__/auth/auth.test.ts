const { register, login } = require("../../controllers/auth/auth.ctrl");
const { getUsers, createUser, updateUserNonce } = require("../../services/users/users.service");
const { v4: uuidv4 } = require("uuid");
const { Role } = require("../../types/users.types");
const {ethers} = require("ethers");
const jwt = require("jsonwebtoken");


// Mock dependencies
jest.mock("../../services/users/users.service");
jest.mock("uuid");
jest.mock("jsonwebtoken");
jest.mock("ethers");

describe("register controller", () => {
    const mockResult = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    const mockRequest = (body: any) => ({
        body
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("return 400 if walletAddress is missing", async() => {
        const req = mockRequest({});
        const res = mockResult();

        await register(req as any, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Wallet address is required"
        });
    });

    it("return 400 if user already exists", async() => {
        const req = mockRequest({walletAddress: "0xABC"});
        const res = mockResult();

        (getUsers as jest.Mock).mockResolvedValue({id: 1});

        await register(req as any, res);

        expect(getUsers).toHaveBeenCalledWith({
            where: {walletAddress: "0xabc"}
        });

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "User already exists"
        });
    });

    it("cretae user and return 201", async() => {
        const req = mockRequest({walletAddress: "0xABC"});
        const res = mockResult();

        (getUsers as jest.Mock).mockResolvedValue(null);
        (uuidv4 as jest.Mock).mockReturnValue("mocked-nonce");

        const mockCreateUser = {
            id: 1,
            walletAddress: "0xabc",
            role: Role.USER,
            nonce: "mocked-nonce"
        };

        (createUser as jest.Mock).mockResolvedValue(mockCreateUser);

        await register(req as any, res);

        expect(createUser).toHaveBeenCalledWith({
            walletAddress: "0xabc",
            role: Role.USER,
            nonce: "mocked-nonce"
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockCreateUser);
    });

    it("should return 500 if an error occurs", async() => {
        const req = mockRequest({walletAddress: "0xABC"});
        const res = mockResult();

        (getUsers as jest.Mock).mockRejectedValue(new Error("DB failure"));

        await register(req as any, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.stringContaining("Internal server error")
            })
        );
    });
});

describe("login controller", () => {
    const mockResult = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    const mockRequest = (body: any) => ({
        body
    });

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = "test-secret";
    });

    it("return 400 if user not found", async () => {
        const req = mockRequest({
            walletAddress: "0xABC",
            signature: "sig",
        });
        const res = mockResult();

        getUsers.mockResolvedValue([]);

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "User not found"
        });
    });

    it("return 400 if nonce expired", async() => {
        const req = mockRequest({
            walletAddress: "0xABC",
            signature: "sig"
        });
        const res = mockResult();

        getUsers.mockResolvedValue([{
            id: "1",
            nonce: "mock-nonce",
            nonceExpiresAt: new Date(Date.now() - 1000),
            role: Role.USER
        }]);

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Nonce has expired. Please request a new login"
        });
    });

    it("return 401 if signature is invalid", async() => {
        const req = mockRequest({
            walletAddress: "0xABC",
            signature: "sig"
        });
        const res = mockResult();

        const user = {
            id: "1",
            nonce: "mock-nonce",
            nonceExpiresAt: new Date(Date.now() + 100000),
            role: Role.USER
        };

        getUsers.mockResolvedValue([user]);

        ethers.verifyMessage.mockReturnValue("0xWRONG");

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: "Invalid signature"
        });
    });

    it("login successfully and return token", async() => {
        const req = mockRequest({
            walletAddress: "0xABC",
            signature: "sig"
        });
        const res = mockResult();

        const user = {
            id: "1",
            nonce: "mock-nonce",
            nonceExpiresAt: new Date(Date.now() + 100000),
            role: Role.USER
        };

        getUsers.mockResolvedValue([user]);

        ethers.verifyMessage.mockReturnValue("0xabc");
        uuidv4.mockReturnValue("new-nonce");

        updateUserNonce.mockResolvedValue(true);
        
        jwt.sign.mockReturnValue("mocked-jwt-token");

        await login(req, res);

        expect(updateUserNonce).toHaveBeenCalledWith({
            userId: "1",
            newNonce: "new-nonce",
            nonceExpiresAt: expect.any(Date)
        });

        expect(jwt.sign).toHaveBeenCalledWith(
            {userId: "1", role: Role.USER},
            "test-secret",
            {expiresIn: "5 minutes"}
        );
        expect(res.json).toHaveBeenCalledWith({
            userId: "1",
            token: "mocked-jwt-token"
        });
    });

    it("return 500 on unexpected error", async() => {
        const req = mockRequest({
            walletAddress: "0xABC",
            signature: "sig"
        });
        const res = mockResult();

        getUsers.mockRejectedValue(new Error("DB failure"));

        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.stringContaining("Internal server error")
            })
        );
    });
});