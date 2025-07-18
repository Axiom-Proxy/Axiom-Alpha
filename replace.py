import os

for root, dirs, files in os.walk('public'):
    for file in files:
        try:
         file_path = os.path.join(root, file)
         with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
         with open(file_path, 'w', encoding='utf-8') as f:
            for line in lines:
                if not line.lstrip().startswith(('/', '*')):
                    f.write(line)
        except:
            print(file_path)
            pass