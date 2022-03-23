# eslint-plugin-parentheses-single-line-jsx

An ESLint rule to enforce parentheses around single line JSX.

## Why?

Adding parentheses around JSX makes it easier to separate from other code.

For multiline JSX, we have [react/jsx-wrap-multilines](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md).  However, there is no such rule for single line JSX.

## Installation

First, make sure you have ESLint installed.

Then, install `eslint-plugin-parentheses-single-line-jsx`:

```sh
npm install --save-dev eslint-plugin-parentheses-single-line-jsx

# or

yarn add --dev eslint-plugin-parentheses-single-line-jsx
```

## Usage

Add `parentheses-single-line-jsx` to your ESLint plugins in `.eslintrc`:

```json
{
  "plugins": ["parentheses-single-line-jsx"]
}
```

Then enable the rule in the `rules` section of `.eslintrc`:

```json
{
  "rules": {
    "parentheses-single-line-jsx/parentheses-single-line-jsx": "error"
  }
}
```

### Incorrect code for this rule

```jsx
const content = <MyComponent />;
```

```jsx
return <MyComponent />;
```

```jsx
<MyComponent
    contentProp={<MyComponent />}
/>
```

## Correct code for this rule

```jsx
const content = (<MyComponent />);
```

```jsx
return (<MyComponent />);
```

```jsx
<MyComponent
    contentProp={(<MyComponent />)}
/>
```

## Contributing

Issues and PRs are more than welcome. Thanks!
