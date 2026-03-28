import { Text } from "@/components/ui/Text";
import { AssessmentQuestion } from "@/services/types";

interface AssessmentQuestionItemProps {
  question: AssessmentQuestion;
  index: number;
  answer: string;
  onAnswerChange: (id: string, value: string) => void;
}

export function AssessmentQuestionItem({
  question,
  index,
  answer,
  onAnswerChange,
}: AssessmentQuestionItemProps) {
  return (
    <div className="bg-white border border-border p-8 mb-6 shadow-sm">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
          <Text variant="body_sm" className="text-primary font-bold">
            {index + 1}
          </Text>
        </div>
        <div>
          <Text variant="title_lg" className="text-neutral-100 mb-2">
            {question.questionText}
          </Text>
        </div>
      </div>

      {question.questionType === "multiple-choice" && question.options && (
        <div className="flex flex-col gap-3">
          {question.options.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-4 p-4 border-2 transition-all cursor-pointer ${
                answer === option
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-neutral-60/50"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={answer === option}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                className="w-5 h-5 accent-primary"
              />
              <Text
                variant="body_md"
                className={
                  answer === option
                    ? "text-primary font-medium"
                    : "text-neutral-60"
                }
              >
                {option}
              </Text>
            </label>
          ))}
        </div>
      )}

      {question.questionType === "short-answer" && (
        <textarea
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => onAnswerChange(question.id, e.target.value)}
          className="w-full min-h-[150px] p-4 border border-border bg-white text-neutral-100 text-[15px] focus:outline-none focus:border-primary transition-colors resize-none"
        />
      )}

      {question.questionType === "true-false" && (
        <div className="flex gap-4">
          {["True", "False"].map((option) => (
            <label
              key={option}
              className={`flex-1 flex items-center justify-center gap-4 p-4 border-2 transition-all cursor-pointer ${
                answer === option
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-neutral-60/50"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={answer === option}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                className="w-5 h-5 accent-primary"
              />
              <Text
                variant="body_md"
                className={
                  answer === option
                    ? "text-primary font-medium"
                    : "text-neutral-60"
                }
              >
                {option}
              </Text>
            </label>
          ))}
        </div>
      )}

      {question.questionType === "problem-solve" && (
        <div className="flex flex-col gap-2">
          <textarea
            placeholder="// Paste your code or solution here..."
            value={answer}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            className="w-full min-h-[300px] p-4 border border-border bg-light-gray text-neutral-100 text-[14px] font-mono focus:outline-none focus:border-primary transition-colors resize-none"
          />
          <Text variant="body_sm" className="text-neutral-60 italic">
            Note: You can use Markdown for code formatting if needed.
          </Text>
        </div>
      )}
    </div>
  );
}
