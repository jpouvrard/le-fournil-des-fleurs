import { Admin, CreateButton, EditGuesser, ListGuesser, ShowGuesser } from "@/components/admin";
import { dataProvider } from "@/lib/admin/dataProvider";
import { FileTextIcon, PackageIcon, SettingsIcon, ShoppingBagIcon, TruckIcon, UsersIcon } from "lucide-react";
import { Resource } from "ra-core";

// Dashboard component
const Dashboard = () => (
    <div className="p-6">
        <h1 className="mb-6 font-bold text-3xl">Tableau de bord TerroirDirect</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h2 className="mb-2 font-semibold text-xl">Commandes du jour</h2>
                <p className="font-bold text-3xl text-primary">0</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h2 className="mb-2 font-semibold text-xl">Nouveaux clients</h2>
                <p className="font-bold text-3xl text-primary">0</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h2 className="mb-2 font-semibold text-xl">Chiffre d'affaires</h2>
                <p className="font-bold text-3xl text-primary">0 €</p>
            </div>
        </div>
    </div>
);

export function AdminApp() {
    return (
        <Admin dataProvider={dataProvider} dashboard={Dashboard}>
            {/* Products Resource */}
            <Resource
                name="products"
                icon={PackageIcon}
                list={ListGuesser}
                edit={EditGuesser}
                show={ShowGuesser}
                options={{ label: "Produits" }}
            />

            {/* Orders Resource */}
            <Resource
                name="orders"
                icon={ShoppingBagIcon}
                list={ListGuesser}
                edit={EditGuesser}
                show={ShowGuesser}
                options={{ label: "Commandes" }}
            />

            {/* Users/Customers Resource */}
            <Resource
                name="users"
                icon={UsersIcon}
                list={ListGuesser}
                edit={EditGuesser}
                show={ShowGuesser}
                options={{ label: "Clients" }}
            />

            {/* Suppliers Resource */}
            <Resource
                name="suppliers"
                icon={TruckIcon}
                list={ListGuesser}
                edit={EditGuesser}
                show={ShowGuesser}
                options={{ label: "Fournisseurs" }}
            />

            {/* Invoices Resource */}
            <Resource
                name="invoices"
                icon={FileTextIcon}
                list={ListGuesser}
                edit={EditGuesser}
                show={ShowGuesser}
                options={{ label: "Factures" }}
            />

            {/* Settings Resource (if needed) */}
            <Resource
                name="settings"
                icon={SettingsIcon}
                list={ListGuesser}
                edit={EditGuesser}
                options={{ label: "Paramètres" }}
            />
        </Admin>
    );
}
