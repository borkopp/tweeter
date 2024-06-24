<template>
    <div class="settings-container">
        <main class="main-content">
            <h2>Settings</h2>
            <form>
                <div class="form-group">
                    <label for="profile-picture">Change profile picture</label>
                    <input type="file" id="profile-picture" />
                </div>
                <p class="settings-title">Email</p>
                <div class="settings-field">
                    {{ user.email }}
                </div>
                <p class="settings-title">Username</p>
                <div class="settings-field">
                    {{ user.username }}
                    <v-icon icon="mdi-pencil" class="field-icon"></v-icon>
                </div>
                <p class="settings-title">Name</p>
                <div class="settings-field">
                    {{ user.name }}
                    <v-icon icon="mdi-pencil" class="field-icon"></v-icon>
                </div>
                <p class="settings-title">Password</p>
                <div class="settings-field">
                    ********
                    <v-icon icon="mdi-pencil" class="field-icon"></v-icon>
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
                <button type="submit"><v-icon icon="mdi-content-save" class="icon"></v-icon>Save Changes</button>
            </form>
        </main>
    </div>
</template>

<script>
import { useAccountStore } from '@/stores/StoreAccount';
export default {
    setup() {
        const accountStore = useAccountStore();
        const user = accountStore.user;

        console.log(user.value);

        return {
            user,
        }
    }
}
</script>
@
<style scoped lang="scss">
@import '../css/settings.scss'
</style>