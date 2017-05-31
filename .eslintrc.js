module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "ecmaFeatures": {
        "classes": true,
        "jsx": true
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "react/display-name": 1,
        "react/jsx-boolean-value": 1,
        "react/jsx-no-undef": 1,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/no-did-mount-set-state": 1,
        "react/no-did-update-set-state": 1,
        "react/no-multi-comp": 1,
        "react/no-unknown-property": 1,
        "react/prop-types": 1,
        "react/react-in-jsx-scope": 1,
        "react/self-closing-comp": 1,
        "react/sort-comp": 1,
        "react/jsx-wrap-multilines": 1,
        "strict": 0,
        "no-unused-vars": 0 // see https://github.com/babel/babel-eslint/issues/21
    }
};