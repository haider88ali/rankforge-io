<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use OpenAI\Laravel\Facades\OpenAI;

class AiController extends Controller
{
    /**
     * Generate 3 meta description variations.
     */
    public function metaDescription(Request $request): JsonResponse
    {
        $request->validate([
            'keyword'   => 'required|string|max:200',
            'pageTitle' => 'nullable|string|max:200',
        ]);

        $keyword   = $request->input('keyword');
        $pageTitle = $request->input('pageTitle', '');

        $prompt = <<<PROMPT
You are an expert SEO copywriter. Generate exactly 3 unique meta descriptions for the following page.

Target keyword: "{$keyword}"
Page title: "{$pageTitle}"

Rules:
- Each must be between 140–160 characters (no more, no less)
- Each must naturally include the target keyword
- Each must be compelling, action-oriented, and boost click-through rate
- Do NOT use quotation marks around the descriptions
- Return ONLY the 3 descriptions, one per line, no numbering, no labels
PROMPT;

        try {
            $response = OpenAI::chat()->create([
                'model'    => env('OPENAI_MODEL', 'gpt-4o-mini'),
                'messages' => [
                    ['role' => 'system', 'content' => 'You are an SEO expert. Return only the requested output, nothing else.'],
                    ['role' => 'user',   'content' => $prompt],
                ],
                'max_tokens'  => 400,
                'temperature' => 0.8,
            ]);

            $text    = $response->choices[0]->message->content;
            $results = array_values(array_filter(
                array_map('trim', explode("\n", $text)),
                fn($line) => strlen($line) > 30
            ));

            return response()->json(['results' => array_slice($results, 0, 3)]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'AI generation failed. Please check your API key.'], 500);
        }
    }

    /**
     * Generate SEO, emotional, and high-CTR title variations.
     */
    public function seoTitles(Request $request): JsonResponse
    {
        $request->validate(['keyword' => 'required|string|max:200']);

        $keyword = $request->input('keyword');

        $prompt = <<<PROMPT
You are an expert SEO copywriter. Generate 9 page title variations for the keyword: "{$keyword}"

Return exactly 9 titles in this format (one per line, no numbering):
- 3 SEO-optimized titles (keyword-rich, under 60 characters, include a year or number)
- 3 emotional titles (connect with feelings, desires, or pain points)
- 3 high-CTR curiosity titles (pattern interrupts, create curiosity, make people want to click)

Return ONLY the 9 titles, one per line. Label each group with a comment:
#SEO
[3 seo titles]
#EMOTIONAL
[3 emotional titles]
#CLICKBAIT
[3 curiosity titles]
PROMPT;

        try {
            $response = OpenAI::chat()->create([
                'model'    => env('OPENAI_MODEL', 'gpt-4o-mini'),
                'messages' => [
                    ['role' => 'system', 'content' => 'You are an SEO expert. Return only the requested output.'],
                    ['role' => 'user',   'content' => $prompt],
                ],
                'max_tokens'  => 500,
                'temperature' => 0.9,
            ]);

            $text  = $response->choices[0]->message->content;
            $lines = array_map('trim', explode("\n", $text));

            $seo       = [];
            $emotional = [];
            $clickbait = [];
            $current   = null;

            foreach ($lines as $line) {
                if (empty($line)) continue;
                if (str_starts_with($line, '#SEO'))       { $current = 'seo'; continue; }
                if (str_starts_with($line, '#EMOTIONAL')) { $current = 'emotional'; continue; }
                if (str_starts_with($line, '#CLICK'))     { $current = 'clickbait'; continue; }

                if ($current === 'seo' && count($seo) < 3)             $seo[]       = $line;
                elseif ($current === 'emotional' && count($emotional) < 3) $emotional[] = $line;
                elseif ($current === 'clickbait' && count($clickbait) < 3) $clickbait[] = $line;
            }

            return response()->json(compact('seo', 'emotional', 'clickbait'));
        } catch (\Exception $e) {
            return response()->json(['error' => 'AI generation failed. Please check your API key.'], 500);
        }
    }

    /**
     * Generate a full blog post outline.
     */
    public function blogOutline(Request $request): JsonResponse
    {
        $request->validate([
            'topic' => 'required|string|max:300',
            'tone'  => 'nullable|string|in:informative,conversational,professional,beginner-friendly',
        ]);

        $topic = $request->input('topic');
        $tone  = $request->input('tone', 'informative');

        $prompt = <<<PROMPT
You are an expert content strategist and SEO writer. Create a complete, detailed blog post outline for the topic: "{$topic}"

Tone: {$tone}

Return the outline in this EXACT JSON format:
{
  "h1": "The main blog post title",
  "sections": [
    {
      "h2": "Section heading",
      "h3s": ["Subsection 1", "Subsection 2", "Subsection 3"]
    }
  ],
  "faqs": [
    { "q": "Question here?", "a": "Brief answer here." }
  ],
  "conclusion": "Conclusion section heading"
}

Requirements:
- 5-6 H2 sections
- 2-3 H3s per section
- 4 FAQ items
- H1 must include the target keyword and be compelling
- Return ONLY valid JSON, nothing else
PROMPT;

        try {
            $response = OpenAI::chat()->create([
                'model'    => env('OPENAI_MODEL', 'gpt-4o-mini'),
                'messages' => [
                    ['role' => 'system', 'content' => 'You are a content strategist. Return only valid JSON.'],
                    ['role' => 'user',   'content' => $prompt],
                ],
                'max_tokens'  => 1200,
                'temperature' => 0.7,
            ]);

            $text = $response->choices[0]->message->content;

            // Strip markdown code fences if present
            $text = preg_replace('/^```json\s*/m', '', $text);
            $text = preg_replace('/^```\s*/m', '', $text);
            $text = trim($text);

            $outline = json_decode($text, true);

            if (!$outline || !isset($outline['h1'])) {
                return response()->json(['error' => 'Could not parse AI response. Try again.'], 500);
            }

            return response()->json($outline);
        } catch (\Exception $e) {
            return response()->json(['error' => 'AI generation failed. Please check your API key.'], 500);
        }
    }
}
