import { Rule } from 'eslint';

const parenthesesSingleLineJsx = (context: Rule.RuleContext) : Rule.RuleListener => {
    return {
        JSXElement(node: Rule.Node) {
            // Multiline JSX is not our responsibility
            if (node.loc.start.line !== node.loc.end.line) {
                return;
            }

            // If element is nested inside another element, we don't need to handle it
            // TypeScript does not know about JSXElement, so we have to disable it
            // @ts-ignore
            if (node.parent.type === 'JSXElement') {
                return;
            }

            const sourceCode = context.getSourceCode();

            const tokenBefore = sourceCode.getTokenBefore(node);
            const tokenAfter = sourceCode.getTokenAfter(node);

            // Node is already parenthesised
            if (tokenBefore.value === '(' && tokenAfter.value === ')') {
                return;
            }

            context.report({
                node,
                message: 'Missing parentheses around single line JSX. ',
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