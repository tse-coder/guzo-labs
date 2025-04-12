'use client';

import { useState, useRef, useEffect } from 'react';
import { members } from '@/data/members';

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const commonQuestions = [
    "What is the info of {name}?",
    "How many points does {name} have?",
    "When does {name}'s subscription end?"
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessages: Message[] = [
        {
          type: 'assistant',
          content: "Hello! I'm your AI assistant. Here are some common questions you can ask:"
        },
        ...commonQuestions.map(question => ({
          type: 'assistant' as const,
          content: question
        }))
      ];
      setMessages(initialMessages);
    }
  }, [isOpen, messages.length, commonQuestions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(inputValue);
      setMessages(prev => [...prev, { type: 'assistant', content: response }]);
    }, 500);
  };

  const handleQuestionClick = (question: string) => {
    const userMessage: Message = {
      type: 'user',
      content: question
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(question);
      setMessages(prev => [...prev, { type: 'assistant', content: response }]);
    }, 500);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Check for member-specific queries
    const memberNameMatch = query.match(/what is the info of (.*?)\?/i) || 
                          query.match(/tell me about (.*?)/i);
    
    if (memberNameMatch) {
      const name = memberNameMatch[1].trim();
      const member = members.find(m => 
        m.userInfo.fullName.toLowerCase().includes(name.toLowerCase())
      );
      
      if (member) {
        return `Here's the information for ${member.userInfo.fullName}:
- ID: ${member.id}
- Email: ${member.userInfo.email}
- Membership Type: ${member.membershipType}
- Package Type: ${member.packageInfo.packageType}
- Points: ${member.points}
- Subscription: ${member.userInfo.subscriptionStartDate} to ${member.userInfo.subscriptionEndDate}
- Discounts: ${member.packageInfo.discounts.map(d => `${d.discountType} (${d.discountAmount}%)`).join(', ')}`;
      }
      return `I couldn't find a member named "${name}".`;
    }

    // Check for membership type queries
    if (lowerQuery.includes('membership type')) {
      const typeMatch = query.match(/what is the membership type of (.*?)\?/i);
      if (typeMatch) {
        const name = typeMatch[1].trim();
        const member = members.find(m => 
          m.userInfo.fullName.toLowerCase().includes(name.toLowerCase())
        );
        return member 
          ? `${member.userInfo.fullName} has a ${member.membershipType} membership.`
          : `I couldn't find a member named "${name}".`;
      }
    }

    // Check for points queries
    if (lowerQuery.includes('points')) {
      const pointsMatch = query.match(/how many points does (.*?) have\?/i);
      if (pointsMatch) {
        const name = pointsMatch[1].trim();
        const member = members.find(m => 
          m.userInfo.fullName.toLowerCase().includes(name.toLowerCase())
        );
        return member 
          ? `${member.userInfo.fullName} has ${member.points} points.`
          : `I couldn't find a member named "${name}".`;
      }
    }

    return "I'm not sure how to answer that. Could you try rephrasing your question?";
  };

  const BotIcon = ({ size = 24, className = '' }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Head */}
      <circle cx="25" cy="25" r="20" fill="currentColor" stroke="currentColor" strokeWidth="2" />
      {/* Antenna */}
      <line x1="25" y1="5" x2="25" y2="0" stroke="currentColor" strokeWidth="2" />
      <circle cx="25" cy="0" r="2" fill="currentColor" />
      {/* Eyes */}
      <circle cx="18" cy="20" r="3" fill="white" stroke="currentColor" strokeWidth="1" />
      <circle cx="32" cy="20" r="3" fill="white" stroke="currentColor" strokeWidth="1" />
      <circle cx="18" cy="20" r="1" fill="currentColor" />
      <circle cx="32" cy="20" r="1" fill="currentColor" />
      {/* Mouth */}
      <path d="M20 30 Q25 35 30 30" fill="none" stroke="white" strokeWidth="2" />
      {/* Ears/Headphones */}
      <rect x="5" y="20" width="5" height="10" rx="2" fill="currentColor" />
      <rect x="40" y="20" width="5" height="10" rx="2" fill="currentColor" />
    </svg>
  );

  return (
    <>
      {/* Floating Assistant Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Open AI Assistant"
      >
        <BotIcon size={32} className="text-white" />
      </button>

      {/* Chat Overlay */}
      <div
        className={`fixed bottom-0 right-6 w-96 bg-white dark:bg-gray-800 rounded-t-lg shadow-xl transition-all duration-300 transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 rounded-full p-2">
              <BotIcon size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Assistant
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'assistant' && (
                <div className="flex-shrink-0 mr-2">
                  <div className="bg-indigo-600 rounded-full p-2">
                    <BotIcon size={24} className="text-white" />
                  </div>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Common Questions */}
        {messages.length === 0 && (
          <div className="p-4 border-t dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Common Questions
            </h4>
            <div className="space-y-2">
              {commonQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
            <button
              onClick={handleSendMessage}
              className="bg-indigo-600 text-white rounded-lg p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant; 