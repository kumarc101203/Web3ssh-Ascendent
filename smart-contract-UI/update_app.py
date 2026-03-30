import re
import os

filepath = r"d:\hackathons & other projects\web3ssh-ASCendant--main\smart-contract-UI\src\App.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Sun, Moon to imports
if 'Sun,' not in content:
    content = content.replace("Clock,", "Clock,\n  Sun,\n  Moon,")

# 2. Add isDarkMode state hooks
if 'isDarkMode' not in content:
    state_hook_injection = """
  const [isDarkMode, setIsDarkMode] = useState(true);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
"""
    content = content.replace("function App() {\n  const [contract", "function App() {" + state_hook_injection + "\n  const [contract")

# 3. Add Theme Toggle Button mapping in Header
if "Sun className" not in content:
    header_regex = r'(<h1 className="text-4xl font-bold [^"]+">Smart Contract Management</h1>\s*<p className="text-lg [^"]+">Monitor and manage smart contracts</p>\s*</div>)'
    
    toggle_html = r"""\1
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-3 rounded-full skeuo-button border-none bg-black/10 dark:bg-white/10"
              >
                {isDarkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-blue-900" />}
              </button>"""
    content = re.sub(header_regex, toggle_html, content)

# 4. Overhaul main container
content = content.replace('bg-gradient-to-br from-slate-50 via-white to-slate-100', 'liquid-container relative w-full')

# 5. Overhaul background panels to Glassmorphism
content = content.replace('bg-white rounded-2xl shadow-xl border border-gray-200', 'glass-panel p-8')
content = content.replace('bg-white rounded-2xl shadow-2xl', 'glass-panel max-w-4xl shadow-none')
content = content.replace('bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden', 'glass-panel p-5 relative overflow-hidden border-none shadow-none')

# 6. Simplify the UI color classes (removing hardcoded grays to let the CSS inherit `var(--text-primary)`)
content = content.replace('text-gray-900', 'text-title')
content = content.replace('text-gray-800', 'text-title opacity-90')
content = content.replace('text-gray-700', 'text-body font-medium')
content = content.replace('text-gray-600', 'text-body')
content = content.replace('text-gray-500', 'text-body opacity-80')

content = content.replace('border-gray-200', 'border-white/20 dark:border-white/10')
content = content.replace('border-gray-300', 'border-white/20 dark:border-white/10')

content = content.replace('bg-gray-50', 'bg-white/5 dark:bg-black/10')
content = content.replace('bg-gray-100', 'bg-white/10 dark:bg-black/20')

# 7. Inputs and text areas to Skeuo
input_replacements = [
    ('className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"', 'className="skeuo-input ring-0"'),
    ('className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"', 'className="skeuo-input ring-0"'),
    ('className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"', 'className="skeuo-input pl-12 ring-0"'),
    ('className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"', 'className="skeuo-input resize-none ring-0"')
]

for old, new in input_replacements:
    content = content.replace(old, new)
content = content.replace('border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors', 'border border-dashed border-white/30 rounded-xl p-6 text-center skeuo-input hover:border-white/50 cursor-pointer')


# 8. Modals overlays 
content = content.replace('bg-black bg-opacity-50', 'bg-black/40 backdrop-blur-md')


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated App.tsx styles")
