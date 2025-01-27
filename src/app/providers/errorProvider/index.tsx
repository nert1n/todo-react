import React, { Component } from "react";

import { ErrorPage } from "@pages/error";

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error) {
		console.error("Error caught by ErrorBoundary:", error);
	}

	render() {
		if (this.state.hasError) {
			return <ErrorPage errorText={"What's wrong on the page!"} />;
		}
		return this.props.children;
	}
}
