import { Rule } from 'eslint';

const parenthesesSingleLineJsx = (context: Rule.RuleContext) : Rule.RuleListener => {
    return {
        ImportDeclaration(node) {
            context.report({
                node,
                message: 'Lol?',
            });
        },
    };
};

module.exports = {
    rules: {
        'parentheses-single-line-jsx': {
            create: parenthesesSingleLineJsx,
        },
    },
};