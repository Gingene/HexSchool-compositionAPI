import { ref } from 'vue';

export default () => {
  const isDark = ref(true);
  const theme = ref('');
  const colorTheme = [
    {
      name: 'theme-orange',
      style: 'bg-s-orange'
    },
    {
      name: 'theme-blue',
      style: 'bg-s-blue'
    },
    {
      name: 'theme-green',
      style: 'bg-s-green'
    }
  ];
  const root = document.querySelector(':root');

  const changeTheme = (toChangeTheme: string) => {
    theme.value = toChangeTheme;

    root!.className = '';
    if (isDark.value) root?.classList.add('dark');
    if (theme.value === 'theme-default') {
      return;
    }
    root?.classList.add(theme.value);
  };
  const toggleDarkTheme = () => {
    isDark.value = !isDark.value;

    if (isDark.value) {
      root?.classList.add('dark');
    } else {
      root?.classList.remove('dark');
    }
  };

  return { toggleDarkTheme, changeTheme, isDark, colorTheme };
};
