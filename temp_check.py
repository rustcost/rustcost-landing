import json
with open('src/i18n/locales/ko/translation.json', encoding='utf-8') as f:
    data = json.load(f)
print(list(data.keys()))
