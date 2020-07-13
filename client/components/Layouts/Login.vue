<template>
    <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
            <a-input v-decorator="['username', { rules: [{ required: true, message: 'Please input your username!' }] }]" placeholder="Username">
                <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25);" />
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-input v-decorator="['password', { rules: [{ required: true, message: 'Please input your Password!' }] }]" type="password" placeholder="Password">
                <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25);" />
            </a-input>
        </a-form-item>
        <a-form-item>
            <!-- <a-checkbox
                class="remember"
                v-decorator="[
                    'remember',
                    {
                        valuePropName: 'checked',
                        initialValue: true,
                    },
                ]"
            >
                Remember me
            </a-checkbox> -->
            <a-button type="primary" html-type="submit" class="login-form-button">
                Log in
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
export default {
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    props: {
        getUser: Function,
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.$emit('getUser', values);
                    console.log('Received values of form: ', values);
                }
            });
        },
    },
};
</script>
<style>
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
    float: right;
}
#components-form-demo-normal-login .login-form-button {
    width: 100%;
}
</style>
