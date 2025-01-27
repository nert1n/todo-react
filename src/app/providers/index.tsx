import { Provider } from "react-redux";

import { AuthProvider } from "@app/providers/authProvider";
import { ErrorBoundary } from "@app/providers/errorProvider";
import { store } from "@app/store/store.ts";

import { IProviders } from "./providers.interface.ts";

const Providers = ({ children }: IProviders) => {
	return (
		<Provider store={store}>
			<ErrorBoundary>
				<AuthProvider>{children}</AuthProvider>
			</ErrorBoundary>
		</Provider>
	);
};

export default Providers;
