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


If you mean **Custom Subagents in Claude Code**, think of them as **specialized AI workers that you configure for one particular type of job**.

For example, instead of telling Claude every time:

> “Review my React code, don't modify anything, check performance, security and best practices, and give me a structured report.”

You create a **React Code Reviewer subagent once**, and then simply ask Claude to use it. Claude runs that worker in its own context and returns the result to your main conversation. ([Claude][1])

## 1. What is a Custom Subagent?

A custom subagent is essentially:

**Specialized prompt + specific tools + specific model + optional permissions/memory**

For example, you could create:

* `react-reviewer` → reviews React code
* `test-writer` → creates Jest tests
* `bug-debugger` → investigates bugs
* `security-reviewer` → checks security vulnerabilities
* `api-reviewer` → reviews Node.js APIs
* `performance-expert` → analyzes frontend performance

Each subagent has its **own context window**, so large code exploration or logs don't unnecessarily fill your main Claude conversation. ([Claude][1])

---

# 2. How do you create one?

The easiest way is:

```text
/agents
```

Claude Code opens the Agents interface.

Then:

```text
Library
   ↓
Create new agent
   ↓
Choose scope
   ↓
Generate with Claude
   ↓
Select tools
   ↓
Select model
   ↓
Save
```

Claude currently supports **project-level** and **personal/user-level** subagents. A project agent is available only in that project, while a personal agent can be reused across your projects. ([Claude Academy][2])

### Example

Suppose you want a **React code reviewer**.

When Claude asks what the agent should do, you could write:

```text
Create a React code review agent.

It should:
- Review React and TypeScript code
- Check performance
- Check unnecessary re-renders
- Check hooks usage
- Check accessibility
- Check security issues
- Follow clean-code principles
- Never modify files
- Return findings with severity and recommendations
```

Claude can generate the configuration for you.

---

# 3. What does the actual configuration look like?

A custom subagent is basically a Markdown file.

For example:

```text
.claude/
└── agents/
    └── react-reviewer.md
```

Inside:

```yaml
---
name: react-reviewer
description: Review React and TypeScript code for performance, security, accessibility and best practices.
tools: Read, Grep, Glob
model: sonnet
---

You are a senior React and TypeScript code reviewer.

Review the code for:

1. React best practices
2. Unnecessary re-renders
3. Incorrect hook usage
4. Performance issues
5. TypeScript problems
6. Accessibility problems
7. Security vulnerabilities
8. Maintainability

Do not modify files.

Return:

## Critical Issues
## Performance Issues
## Code Quality
## Accessibility
## Security
## Recommendations

For every issue explain:
- What is wrong
- Why it matters
- How to fix it
```

The YAML section configures the agent, while everything below it becomes the agent's system prompt. ([Claude Academy][2])

---

# 4. How do you use it?

There are several ways.

### Method 1 — Ask naturally

You can say:

```text
Use the react-reviewer to review my current changes.
```

Claude can delegate the work to that subagent. ([Claude][3])

### Method 2 — Explicitly mention it

For example:

```text
@react-reviewer
Review the Login component.
```

This explicitly invokes the subagent for that task. ([Claude][3])

### Method 3 — Make it automatic

This is where subagents become really powerful.

You can configure the description like:

```yaml
description: Proactively review React code after major code changes for performance, security and best practices.
```

The word **"proactively"** helps Claude understand that it should consider automatically delegating suitable tasks to this agent. ([Claude Academy][2])

---

# 5. Real example for your development work

Given your React/Next.js/Vue/Node.js work, I would create something like this:

```text
Claude
│
├── Main Agent
│
├── react-reviewer
│   └── Reviews React/Next.js code
│
├── vue-reviewer
│   └── Reviews Vue 3/Nuxt code
│
├── backend-reviewer
│   └── Reviews Node.js/Express APIs
│
├── test-writer
│   └── Creates Jest tests
│
└── performance-reviewer
    └── Finds frontend performance problems
```

Then your workflow could become:

```text
You:
"Implement authentication."

        ↓

Main Claude
        ↓
backend-reviewer
        ↓
Reviews API/security
        ↓
Main Claude gets result
        ↓
test-writer
        ↓
Creates tests
        ↓
Main Claude implements/fixes
```

Subagents can also be **chained**, so one can perform a review and another can subsequently handle the next step. ([Claude][3])

---

## 6. Why not just use one big prompt?

This is the important part.

Without subagents:

```text
Main Claude
   ↓
Read 100 files
   ↓
Search code
   ↓
Analyze logs
   ↓
Review code
   ↓
Write tests
   ↓
Main context becomes huge
```

With subagents:

```text
                 ┌── React Reviewer
                 │
Main Claude ─────┼── Test Writer
                 │
                 └── Security Reviewer
                         ↓
                  summarized results
                         ↓
                    Main Claude
```

Each subagent has a **fresh, isolated context**, and only its useful result comes back to the main conversation. This is one of the main reasons Claude recommends subagents for tasks that would otherwise consume a lot of context. ([Claude][1])

---

## 7. Subagent vs Skill — important difference

A simple way to remember it:

|                                | Subagent                   | Skill                          |
| ------------------------------ | -------------------------- | ------------------------------ |
| Purpose                        | Specialized worker         | Reusable workflow/instructions |
| Context                        | **Separate context**       | Main conversation              |
| Can have specific tools        | ✅                          | Depends                        |
| Good for code exploration      | ✅                          | Sometimes                      |
| Good for repeated instructions | ✅                          | ✅                              |
| Main benefit                   | Isolation + specialization | Reusable process               |

So if you want:

> **"Whenever I ask for React code review, send the work to a specialized reviewer."**

→ **Subagent**

If you want:

> **"Whenever I create an API, follow my standard API-development procedure."**

→ **Skill** may be more appropriate.

---

### In one sentence

**A custom Claude subagent is like hiring a specialized developer inside Claude—give it a specific role, instructions, tools and model, then let Claude delegate suitable tasks to it.**

If you want, I can also show you **how to create 5 useful subagents specifically for your React/Next.js + Node.js development workflow**, including the exact `.md` files you can copy into `.claude/agents/`.

[1]: https://code.claude.com/docs/en/subagents?utm_source=chatgpt.com "Create custom subagents - Claude Code Docs"
[2]: https://academy.claude.com/courses/introduction-to-subagents/creating-a-subagent?utm_source=chatgpt.com "Creating a subagent · Introduction to subagents · Claude Academy"
[3]: https://code.claude.com/docs/en/sub-agents?utm_source=chatgpt.com "Create custom subagents - Claude Code Docs"
