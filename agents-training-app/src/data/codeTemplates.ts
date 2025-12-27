export interface CodeTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  code: string;
}

export const CODE_TEMPLATES: CodeTemplate[] = [
  {
    id: 'simple-qa',
    title: 'Simple Q&A',
    description: 'Ask the LLM a question and get a response',
    category: 'Basics',
    code: `# Simple Q&A with the LLM
import js

# Define your question
question = "What are the three laws of robotics?"
print(f"Question: {question}\\n")

# Get response from the LLM
response = await js.callLLM(question)
print(f"Answer: {response}")`.replace(/\$/g, '$$$$'),
  },
  {
    id: 'sentiment-analysis',
    title: 'Sentiment Analysis',
    description: 'Analyze the sentiment of text using the LLM',
    category: 'Text Analysis',
    code: `# Sentiment Analysis
import js

# Sample texts to analyze
texts = [
    "I absolutely love this product! Best purchase ever!",
    "This was a complete waste of money. Very disappointing.",
    "It's okay, nothing special but does the job."
]

print("Sentiment Analysis Results:\\n" + "="*50)

for text in texts:
    prompt = f"Analyze the sentiment of this text and respond with only: Positive, Negative, or Neutral.\\n\\nText: {text}"
    sentiment = await js.callLLM(prompt)
    print(f"\\nText: {text}")
    print(f"Sentiment: {sentiment.strip()}")`.replace(/\$/g, '$$$$'),
  },
  {
    id: 'translation',
    title: 'Language Translation',
    description: 'Translate text between languages',
    category: 'Language',
    code: `# Language Translation
import js

# Texts to translate
english_phrases = [
    "Hello, how are you?",
    "Where is the nearest restaurant?",
    "I would like to book a room."
]

target_language = "Spanish"

print(f"English to {target_language} Translation:\\n" + "="*50)

for phrase in english_phrases:
    prompt = f"Translate this English text to {target_language}. Only respond with the translation:\\n\\n{phrase}"
    translation = await js.callLLM(prompt)
    print(f"\\nEnglish: {phrase}")
    print(f"{target_language}: {translation.strip()}")`.replace(/\$/g, '$$$$'),
  },
  {
    id: 'creative-writing',
    title: 'Story Generator',
    description: 'Generate creative stories with the LLM',
    category: 'Creative',
    code: `# Creative Story Generator
import js

# Story parameters
genre = "science fiction"
setting = "a distant planet"
main_character = "a robot explorer"

print(f"Generating a {genre} story...\\n" + "="*50 + "\\n")

prompt = f"""Write a short {genre} story (3-4 paragraphs) with these elements:
- Setting: {setting}
- Main Character: {main_character}
Make it engaging and creative!"""

story = await js.callLLM(prompt)
print(story)`.replace(/\$/g, '$$$$'),
  },
  {
    id: 'code-explanation',
    title: 'Code Explainer',
    description: 'Get explanations for code snippets',
    category: 'Programming',
    code: `# Code Explanation Assistant
import js

# Code snippet to explain
code_snippet = """
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
"""

print("Code to Explain:")
print(code_snippet)
print("\\n" + "="*50 + "\\n")

prompt = f"""Explain what this code does in simple terms:

{code_snippet}

Include:
1. What the function does
2. How it works
3. Time complexity"""

explanation = await js.callLLM(prompt)
print("Explanation:")
print(explanation)`.replace(/\$/g, '$$$$'),
  },
  {
    id: 'quiz-generator',
    title: 'Quiz Generator',
    description: 'Create educational quizzes on any topic',
    category: 'Education',
    code: `# Educational Quiz Generator
import js

topic = "Python programming basics"
num_questions = 3

print(f"Generating quiz on: {topic}\\n" + "="*50 + "\\n")

prompt = f"""Create {num_questions} multiple choice questions about {topic}.

For each question:
- Provide the question
- List 4 options (A, B, C, D)
- Mark the correct answer
- Give a brief explanation

Format clearly with numbers for each question."""

quiz = await js.callLLM(prompt)
print(quiz)`.replace(/\$/g, '$$$$'),
  },
  {
    id: 'chat-conversation',
    title: 'Multi-Turn Conversation',
    description: 'Have a back-and-forth conversation with the LLM',
    category: 'Advanced',
    code: `# Multi-Turn Conversation Example
import js

# Conversation context
conversation_history = []

async def chat(user_message):
    """Send a message and get a response"""
    conversation_history.append(f"User: {user_message}")

    # Build context from history
    context = "\\n".join(conversation_history[-6:])  # Last 3 exchanges
    prompt = f"{context}\\nAssistant:"

    response = await js.callLLM(prompt)
    conversation_history.append(f"Assistant: {response}")

    return response

# Example conversation
print("Starting conversation...\\n" + "="*50 + "\\n")

# First message
response1 = await chat("Hi! Can you help me plan a trip to Japan?")
print(f"User: Hi! Can you help me plan a trip to Japan?")
print(f"Assistant: {response1}\\n")

# Follow-up
response2 = await chat("I'm interested in both Tokyo and Kyoto. How long should I spend in each?")
print(f"User: I'm interested in both Tokyo and Kyoto. How long should I spend in each?")
print(f"Assistant: {response2}\\n")

# Another follow-up
response3 = await chat("What about food recommendations?")
print(f"User: What about food recommendations?")
print(f"Assistant: {response3}")`.replace(/\$/g, '$$$$'),
  },
];
