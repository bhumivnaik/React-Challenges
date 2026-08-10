import { Component, type ReactNode } from 'react'
import Button from './Button'
interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }


  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2 id="error-boundary-fallback">Something went wrong.</h2>
          <Button type="button" id="error-retry" onClick={() => this.setState({ hasError: false })}>Retry</Button>
        </>
      );
    }

    return this.props.children
  }
}
