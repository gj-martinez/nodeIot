# nodeIot-db

## Usage

```js
const setupDatebase = require('nodeIot-db')

setupDatebase(config).then(db => {
    const {Agent , metric} = db
}).catch(err => console.error(err))

```