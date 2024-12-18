import { sleep } from '@/lib/utils';

export interface ChatMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

const PREDEFINED_RESPONSES = {
  'quest-ce-que-la-prime-de-partage-de-la-valeur': `
    La prime de partage de la valeur (PPV) est une somme que les employeurs peuvent verser à leurs salariés, exonérée de cotisations sociales et, sous certaines conditions, d'impôt sur le revenu. Elle vise à améliorer le pouvoir d'achat des employés.
    <p class="text-xs text-muted-foreground mt-2">Source : URSSAF</p>
  `,
  'qui-est-eligible-dans-mon-entreprise': `
    Tous les salariés liés par un contrat de travail, y compris les intérimaires et les travailleurs handicapés en ESAT, peuvent bénéficier de la PPV. Les critères d'attribution peuvent être modulés selon la rémunération, l'ancienneté ou la durée de présence.
    <p class="text-xs text-muted-foreground mt-2">Source : URSSAF</p>
  `,
  'comment-calculer-le-montant-optimal': `
    Le montant de la PPV est fixé par l'employeur, avec un plafond annuel de 3 000 € par salarié, porté à 6 000 € si un accord d'intéressement ou de participation est en place. Il peut être modulé selon des critères tels que la rémunération ou l'ancienneté.
    <p class="text-xs text-muted-foreground mt-2">Source : URSSAF</p>
  `,
  'quelles-sont-les-etapes-de-mise-en-place': `
    La PPV peut être instaurée par un accord collectif ou une décision unilatérale de l'employeur, après consultation du comité social et économique (CSE) s'il existe. Les modalités de versement et les critères d'attribution doivent être définis et communiqués aux salariés.
  `,
};

function formatResponse(text: string): string {
  // Remove reference numbers [1][2][3] etc.
  const withoutRefs = text.replace(/\[\d+\]/g, '');

  // Convert markdown headings to HTML with Tailwind classes
  const withHeadings = withoutRefs.replace(
    /##\s+([^\n]+)/g, 
    '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>'
  );

  // Convert markdown lists to HTML with Tailwind classes
  const withLists = withHeadings.replace(
    /^\s*-\s+([^\n]+)/gm, 
    '<li class="ml-4 text-muted-foreground">• $1</li>'
  );

  // Wrap lists in ul tags with Tailwind classes
  const withWrappedLists = withLists.replace(
    /(<li[^>]*>.*<\/li>\n?)+/g,
    (match) => `<ul class="space-y-2 my-3">${match}</ul>`
  );

  // Add Tailwind classes to paragraphs
  const withParagraphs = withWrappedLists.replace(
    /^(?!<[uo]l|<li|<h3)(.+)$/gm,
    '<p class="text-muted-foreground mb-2">$1</p>'
  );

  // Clean up any extra whitespace
  return withParagraphs.trim();
}

function getPredefinedResponse(question: string): string | null {
  const normalizedQuestion = question.toLowerCase().trim();
  
  // Map questions to their IDs
  const questionMap = {
    "qu'est-ce que la prime de partage de la valeur ?": 'quest-ce-que-la-prime-de-partage-de-la-valeur',
    "qui est éligible dans mon entreprise ?": 'qui-est-eligible-dans-mon-entreprise',
    "comment calculer le montant optimal ?": 'comment-calculer-le-montant-optimal',
    "quelles sont les étapes de mise en place ?": 'quelles-sont-les-etapes-de-mise-en-place',
  };

  const responseId = questionMap[normalizedQuestion];
  return responseId ? PREDEFINED_RESPONSES[responseId] : null;
}

export async function sendChatMessage(question: string): Promise<string> {
  try {
    if (!question.trim()) {
      throw new Error('La question ne peut pas être vide');
    }

    // Simulate loading time between 1-2 seconds
    await sleep(Math.random() * 1000 + 1000);

    // Check for predefined responses first
    const predefinedResponse = getPredefinedResponse(question);
    if (predefinedResponse) {
      return predefinedResponse;
    }

    // If no predefined response, call the API
    const response = await fetch('https://hook.eu2.make.com/b013stkkhf4yti53u4lffrhblwzvn45r', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: question.trim()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.response) {
      throw new Error('Format de réponse invalide');
    }

    return formatResponse(data.response);
  } catch (error) {
    console.error('Chat error:', error);
    throw new Error('Impossible de communiquer avec l\'assistant');
  }
}