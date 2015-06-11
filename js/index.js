import React from 'react'

import Calculator from './Calculator'
import VariableInput from './VariableInput'

React.render(<Calculator />, document.querySelector('.top'));
React.render(<VariableInput />, document.querySelector('.variables'));
