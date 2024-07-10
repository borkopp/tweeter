<template>
    <div class="settings-container">
        <main class="main-content">
            <h2>Settings</h2>
            <form @submit.prevent="saveChanges">
                <div class="form-group">
                    <label for="profile-picture">Change profile picture</label>
                    <input type="file" id="profile-picture" />
                </div>
                <p class="settings-title">Email</p>
                <div class="settings-field">
                    <input readonly :value="user.email" />
                </div>
                <p class="settings-title">Username</p>
                <div class="settings-field">
                    <input v-model="newUsername" :readonly="!isEditingUsername" placeholder="Enter new username" />
                    <v-icon v-if="!isEditingUsername" icon="mdi-pencil" class="field-icon"
                        @click="enableEditing('username')"></v-icon>
                    <div v-else>
                        <button type="button" @click="saveUsername">Save</button>
                        <button type="button" @click="cancelEditing('username')">Cancel</button>
                    </div>
                </div>
                <p class="settings-title">Name</p>
                <div class="settings-field">
                    <input v-model="newName" :readonly="!isEditingName" placeholder="Enter new name" />
                    <v-icon v-if="!isEditingName" icon="mdi-pencil" class="field-icon"
                        @click="enableEditing('name')"></v-icon>
                    <div v-else>
                        <button type="button" @click="saveName">Save</button>
                        <button type="button" @click="cancelEditing('name')">Cancel</button>
                    </div>
                </div>
                <p class="settings-title">Password</p>
                <div class="settings-field">
                    <input type="password" v-model="currentPassword" :readonly="!isEditingPassword"
                        placeholder="Current password" />
                    <input type="password" v-model="newPassword" :readonly="!isEditingPassword"
                        placeholder="New password" />
                    <v-icon v-if="!isEditingPassword" icon="mdi-pencil" class="field-icon"
                        @click="enableEditing('password')"></v-icon>
                    <div v-else>
                        <button type="button" @click="savePassword">Save</button>
                        <button type="button" @click="cancelEditing('password')">Cancel</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="language">Change Language</label>
                    <select id="language" class="custom-select">
                        <option value="en">English</option>
                        <option value="de">German</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
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

export default {
    setup() {
        const accountStore = useAccountStore();
        const user = accountStore.user;
        const toast = useToast();

        const newUsername = ref(user.username);
        const newName = ref(user.name);
        const currentPassword = ref('');
        const newPassword = ref('');

        const isEditingUsername = ref(false);
        const isEditingName = ref(false);
        const isEditingPassword = ref(false);

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
                toast.error('Username can only contain letters, numbers, dots, underscores, and hyphens. No spaces allowed.');
                return;
            }

            try {
                await accountStore.changeUsername(newUsername.value);
                toast.success('Username updated successfully!');
                isEditingUsername.value = false;
            } catch (error) {
                toast.error('Failed to update username. Please try again.');
            }
        };

        const saveName = async () => {
            try {
                await accountStore.changeName(newName.value);
                toast.success('Name updated successfully!');
                isEditingName.value = false;
            } catch (error) {
                toast.error('Failed to update name. Please try again.');
            }
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
        };
    },
};
</script>

<style scoped lang="scss">
@import '../css/settings.scss';
</style>