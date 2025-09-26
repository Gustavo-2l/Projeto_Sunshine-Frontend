// Componente MarkdownRenderer para renderizar texto Markdown em HTML estilizado
export const MarkdownRenderer = ({ content }) => {
  // Função que converte sintaxe Markdown básica em HTML com classes Tailwind
  const formatMarkdown = (text = "") => {
    return text
      // Headers: #, ##, ###
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-gray-900 mt-6 mb-4">$1</h1>')
      // Negrito e itálico
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Listas não ordenadas e ordenadas
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
      // Blocos de código inline
      .replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-2 py-1 rounded text-sm font-mono">$1</code>')
      // Quebras de linha e parágrafos
      .replace(/\n\n/g, '</p><p class="mb-3">')
      .replace(/\n/g, '<br>');
  };

  // Conteúdo formatado como HTML
  const formattedContent = formatMarkdown(content || "");

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{
        __html: `<p class="mb-3">${formattedContent}</p>`
      }}
    />
  );
};
