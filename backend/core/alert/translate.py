from deep_translator import GoogleTranslator
def lang_change(language,text= """URGENT SAFETY ALERT

    Location: Open Pit North is now unstable (Safety Factor: 0.95).

    All personnel must evacuate IMMEDIATELY.
    Proceed to the next stage position: Muster Point B (South Ridge).
    Await further instructions there.

    Time: Thursday 25 September, 2025 at 5:25:53 pm IST.
    Contact Mine Planner Rajesh Kumar at +91 9876543210 for queries.
    """):
    text = text
    translated_lines = []
    for line in text.split("\n"):
        if line.strip():
            translated_lines.append(GoogleTranslator(source='en', target=language).translate(line))
        else:
            translated_lines.append("")

    final_text = "\n".join(translated_lines)
    return final_text
language = "hi"
a=lang_change(language)
print(a)
