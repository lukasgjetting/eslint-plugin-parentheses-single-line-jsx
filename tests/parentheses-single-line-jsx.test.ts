import { RuleTester } from 'eslint';
import path from 'path';

const parserOptions = {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
        jsx: true,
    },
};

const rule = require('../src/index').rules['parentheses-single-line-jsx'];
const ruleTester = new RuleTester({
    parser: path.join(__dirname, '../node_modules', '@typescript-eslint/parser'),
    parserOptions,
});

ruleTester.run('parentheses-single-line-jsx', rule, {
    valid: [
        `const content = (<MyComponent />);`,
        `
            (() => {
                return (<MyComponent />);
            });
        `,
        `
            <MyComponent
                contentProp={(<Content />)}
            />
        `,
    ],
    invalid: [
        {
            code: `const content = <MyComponent />;`,
            errors: [{ messageId: 'missingSingleLineParens' }],
            output: `const content = (<MyComponent />);`,
        },
        {
            code: `
                (() => {
                    return <MyComponent />;
                });
            `,
            errors: [{ messageId: 'missingSingleLineParens' }],
            output: `
                (() => {
                    return (<MyComponent />);
                });
            `,
        },
        {
            code: `
                <MyComponent
                    contentProp={<Content />}
                />
            `,
            errors: [{ messageId: 'missingSingleLineParens' }],
            output: `
                <MyComponent
                    contentProp={(<Content />)}
                />
            `,
        },
    ],
});