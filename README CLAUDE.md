## Custom Slash Commands in Claude

* **What it is**

  * Custom slash commands are **reusable prompts/instructions** in Claude.
  * You create a command once and invoke it using `/command-name`.
  * Useful for repetitive tasks like code review, PR descriptions, documentation, debugging, etc.
  * Example: `/review` → Claude follows your predefined code-review instructions.

* **How to configure**

  * In **Claude Code**, create a command file inside:

    ```text
    .claude/commands/
    ```
  * Example:

    ```text
    .claude/commands/review.md
    ```
  * Add your instructions:

    ```md
    Review the provided code.

    Check for:
    - Bugs
    - Performance issues
    - Security issues
    - Code quality

    Give concise suggestions with examples.
    ```
  * Run it in Claude Code:

    ```text
    /review
    ```

* **Project vs personal commands**

  * `.claude/commands/` → commands shared with the **project/repository**.
  * Personal/global commands can be configured for commands you want available across projects.

* **With arguments**

  * You can make commands reusable by accepting arguments/context.
  * Example:

    ```text
    /review src/components/Button.tsx
    ```
  * The command instructions can tell Claude how to process the supplied argument.

* **Why use them**

  * ♻️ Avoid repeating prompts
  * ⚡ Faster development workflow
  * 📋 Standardize team practices
  * 🧠 Keep complex instructions reusable
  * 👥 Share common workflows through Git

**Simple example:**
`/test` → run tests → identify failures → explain root cause → suggest fixes.

> **Note:** Claude Code's current command system also supports newer **skills**/custom workflows, so for complex reusable workflows, Skills may be preferable to a simple slash command.
