import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import Header from "@/components/Header";
import { UserContext } from "@/lib/context/UserContext";

describe("Header", () => {
    it("should render the login button if user not logged", () => {
        render(
            <MemoryRouter>
                <UserContext
                    value={{
                        current: null,
                        login: () => Promise.resolve(null),
                        logout: () => Promise.resolve(),
                        register: () => Promise.resolve(),
                    }}
                >
                    <Header />
                </UserContext>
            </MemoryRouter>,
        );
        const loginButton = screen.getByRole("link", { name: "Login" });
        expect(loginButton).toBeInTheDocument();
    });

    it("should render the logout button if user logged", () => {
        render(
            <MemoryRouter>
                <UserContext
                    value={{
                        // @ts-ignore
                        current: {
                            $id: "10",
                        },
                        login: () => Promise.resolve(null),
                        logout: () => Promise.resolve(),
                        register: () => Promise.resolve(),
                    }}
                >
                    <Header />
                </UserContext>
            </MemoryRouter>,
        );
        const logoutButton = screen.getByRole("button", { name: "Logout" });
        expect(logoutButton).toBeInTheDocument();
    });
});
