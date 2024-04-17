<script setup lang="ts">
import { onMounted } from 'vue';
import useTheme from '@/components/hooks/useTheme';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Sun, Moon, AlignJustify } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores';

const { nickname, token } = storeToRefs(useUserStore());
const { checkLogin } = useUserStore();

const { changeTheme, toggleDarkTheme, isDark, colorTheme } = useTheme();

onMounted(() => {
  changeTheme('theme-orange');
  checkLogin();
});
</script>

<template>
  <header class="container flex items-center justify-between py-4">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />

    <div class="wrapper">
      <nav>
        <ul class="hidden space-x-4 lg:flex justify-between items-center">
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li v-if="!token">
            <RouterLink to="/todos">TodoList</RouterLink>
          </li>
          <li>
            <RouterLink to="/todosapi"> TodoListAPI </RouterLink>
          </li>
          <li>
            <Button @click="toggleDarkTheme">
              <template v-if="isDark">
                <Sun />
              </template>
              <template v-else>
                <Moon />
              </template>
            </Button>
          </li>
          <li>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger class="bg-primary">切換主題色</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul class="w-[100px] space-y-4 py-4">
                      <li class="text-center" v-for="color in colorTheme" :key="color.name">
                        <Button
                          @click="changeTheme(color.name)"
                          class="rounded-full size-8 border border-foreground"
                          :class="color.style"
                        ></Button>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </li>
          <li class="whitespace-nowrap">
            <template v-if="!token">
              <RouterLink to="/login">
                <Button> login </Button>
              </RouterLink>
            </template>
            <template v-else> {{ nickname }} 您好 </template>
          </li>
        </ul>

        <Sheet>
          <SheetTrigger as-child>
            <Button class="lg:hidden">
              <AlignJustify />
            </Button>
          </SheetTrigger>
          <SheetContent :side="'top'">
            <SheetHeader>
              <SheetTitle class="hidden"></SheetTitle>
              <SheetDescription class="hidden"> </SheetDescription>
              <ul class="flex flex-col justify-center items-center space-y-4">
                <li class="w-full h-full">
                  <RouterLink to="/" class="block w-full text-center">Home</RouterLink>
                </li>
                <li class="w-full h-full">
                  <RouterLink to="/todos" class="block w-full text-center">TodoList</RouterLink>
                </li>
                <li class="w-full h-full flex justify-center">
                  <Button @click="toggleDarkTheme">
                    <template v-if="isDark">
                      <Sun />
                    </template>
                    <template v-else>
                      <Moon />
                    </template>
                  </Button>
                </li>
                <li class="w-full h-full flex justify-center">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger class="bg-primary">切換主題色</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul class="w-[100px] space-y-4 py-4">
                            <li class="text-center" v-for="color in colorTheme" :key="color.name">
                              <Button
                                @click="changeTheme(color.name)"
                                class="rounded-full size-8 border border-foreground"
                                :class="color.style"
                              ></Button>
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </li>
              </ul>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  </header>
</template>
