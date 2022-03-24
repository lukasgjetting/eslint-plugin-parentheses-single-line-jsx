import { Rule } from 'eslint';

const parenthesesSingleLineJsx = (context: Rule.RuleContext) : Rule.RuleListener => {
    return {
        JSXElement(node: Rule.Node) {
            // Multiline JSX is not our responsibility
            if (node.loc.start.line !== node.loc.end.line) {
                return;
            }

            // If element is nested inside another element, we don't need to handle it
            // TypeScript does not know about JSXElement, so we have to cast it to a string
            if (
                node.parent.type as string === 'JSXElement' ||
                node.parent.type as string === 'JSXFragment'
            ) {
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
                messageId: 'missingSingleLineParens',
                fix: (fixer) => fixer.replaceText(node, `(${sourceCode.getText(node)})`),
            });

        },
    };
};

module.exports = {
    rules: {
        'parentheses-single-line-jsx': {
            meta: {
                fixable: 'code',
                messages: {
                    missingSingleLineParens: 'Missing parentheses around single line JSX.',
                },
            },
            create: parenthesesSingleLineJsx,
        },
    },
};