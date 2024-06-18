<template>
    <div class="settings-container">
        <main class="main-content">
            <h2>Settings</h2>
            <form>
                <div class="form-group">
                    <label for="profile-picture">Change profile picture</label>
                    <input type="file" id="profile-picture" />
                </div>
                <div class="form-group">
                    <label for="username">Change username</label>
                    <input type="text" id="username" placeholder="Enter your username" />
                </div>
                <div class="form-group">
                    <label for="name">Change your name</label>
                    <input type="text" id="name" placeholder="Enter your name" />
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
                <button type="submit">Save Changes</button>
            </form>
        </main>
    </div>
</template>

<script>

</script>
@
<style scoped lang="scss">
@import '../css/settings.scss'
</style>