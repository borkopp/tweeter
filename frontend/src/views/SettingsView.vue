<template>
    <div class="settings-container">
        <main class="main-content">
            <h2>{{ t('settings') }}</h2>
            <form>
                <p class="settings-title">{{ t('email') }}</p>
                <div class="settings-field">
                    <input readonly :value="user.email" />
                </div>
                <p class="settings-title">{{ t('username') }}</p>
                <div class="settings-field">
                    <input v-model="newUsername" :readonly="!isEditingUsername"
                        :placeholder="t('enter_new_username')" />
                    <v-icon v-if="!isEditingUsername" icon="mdi-pencil" class="field-icon"
                        @click="enableEditing('username')"></v-icon>
                    <div v-else>
                        <button type="button" @click="saveUsername">{{ t('save') }}</button>
                        <button type="button" @click="cancelEditing('username')">{{ t('cancel') }}</button>
                    </div>
                </div>
                <p class="settings-title">{{ t('name') }}</p>
                <div class="settings-field">
                    <input v-model="newName" :readonly="!isEditingName" :placeholder="t('enter_new_name')" />
                    <v-icon v-if="!isEditingName" icon="mdi-pencil" class="field-icon"
                        @click="enableEditing('name')"></v-icon>
                    <div v-else>
                        <button type="button" @click="saveName">{{ t('save') }}</button>
                        <button type="button" @click="cancelEditing('name')">{{ t('cancel') }}</button>
                    </div>
                </div>
                <p class="settings-title">{{ t('password') }}</p>
                <div class="settings-field">
                    <input type="password" v-model="currentPassword" :readonly="!isEditingPassword"
                        :placeholder="t('current_password')" />
                    <input type="password" v-model="newPassword" :readonly="!isEditingPassword"
                        :placeholder="t('new_password')" />
                    <v-icon v-if="!isEditingPassword" icon="mdi-pencil" class="field-icon"
                        @click="enableEditing('password')"></v-icon>
                    <div v-else>
                        <button type="button" @click="savePassword">{{ t('save') }}</button>
                        <button type="button" @click="cancelEditing('password')">{{ t('cancel') }}</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="language">{{ t('change_language') }}</label>
                    <select id="language" class="custom-select" v-model="selectedLanguage" @change="changeLanguage">
                        <option value="en">English</option>
                        <option value="de">German</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="da">Danish</option>
                        <option value="hr">Croatian</option>
                        <option value="zh">Chinese</option>
                        <option value="ru">Russian</option>
                    </select>
                </div>
            </form>
        </main>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useAccountStore } from '@/stores/accountStore';
import { useI18nStore } from '@/stores/i18nStore';

export default {
    setup() {
        const accountStore = useAccountStore();
        const i18nStore = useI18nStore();
        const user = accountStore.user;
        const toast = useToast();

        const newUsername = ref(user.username);
        const newName = ref(user.name);
        const currentPassword = ref('');
        const newPassword = ref('');

        const isEditingUsername = ref(false);
        const isEditingName = ref(false);
        const isEditingPassword = ref(false);
        const selectedLanguage = ref(i18nStore.lang);

        const enableEditing = (field) => {
            if (field === 'username') isEditingUsername.value = true;
            if (field === 'name') isEditingName.value = true;
            if (field === 'password') isEditingPassword.value = true;
        };

        const cancelEditing = (field) => {
            if (field === 'username') {
                isEditingUsername.value = false;
                newUsername.value = user.username;
            }
            if (field === 'name') {
                isEditingName.value = false;
                newName.value = user.name;
            }
            if (field === 'password') {
                isEditingPassword.value = false;
                currentPassword.value = '';
                newPassword.value = '';
            }
        };

        const isValidUsername = (username) => {
            const usernameRegex = /^[a-zA-Z0-9._-]+$/;
            return usernameRegex.test(username);
        };

        const saveUsername = async () => {
            if (!isValidUsername(newUsername.value)) {
                toast.error(i18nStore.t('invalid_username'));
                return;
            }

            try {
                await accountStore.changeUsername(newUsername.value);
                toast.success(i18nStore.t('username_updated'));
                isEditingUsername.value = false;
            } catch (error) {
                toast.error(i18nStore.t('username_update_failed'));
            }
        };

        const saveName = async () => {
            try {
                await accountStore.changeName(newName.value);
                toast.success(i18nStore.t('name_updated'));
                isEditingName.value = false;
            } catch (error) {
                toast.error(i18nStore.t('name_update_failed'));
            }
        };

        const changeLanguage = () => {
            i18nStore.changeLang(selectedLanguage.value);
        };

        return {
            user,
            newUsername,
            newName,
            currentPassword,
            newPassword,
            isEditingUsername,
            isEditingName,
            isEditingPassword,
            enableEditing,
            cancelEditing,
            saveUsername,
            saveName,
            isValidUsername,
            selectedLanguage,
            changeLanguage,
            t: i18nStore.t,
        };
    },
};
</script>

<style scoped lang="scss">
@import '../css/settings.scss';
</style>