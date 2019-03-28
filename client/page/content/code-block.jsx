import React from "react";

// import PropTypes from 'prop-types';

export default class CodeBlock extends React.PureComponent {
    constructor(props) {
      super(props)
      this.setRef = this.setRef.bind(this)
    }
  
    setRef(el) {
      this.codeEl = el
    }
  
    componentDidMount() {
      this.highlightCode()
      this.highlightNumber()
    }
  
    componentDidUpdate() {
      this.highlightCode()
      hljs.this.highlightNumber();
    }
  
    highlightCode() {
      hljs.highlightBlock(this.codeEl)
    }

    highlightNumber() {
        hljs.lineNumbersBlock(this.codeEl);
    }
  
    render() {
      return (
        <pre>
          <code ref={this.setRef} className={`language-${this.props.language}`}>
            {this.props.value}
          </code>
        </pre>
      )
    }
  }
  
//   CodeBlock.defaultProps = {
//     language: ''
//   }
  
//   CodeBlock.propTypes = {
//     value: PropTypes.string.isRequired,
//     language: PropTypes.string
//   }