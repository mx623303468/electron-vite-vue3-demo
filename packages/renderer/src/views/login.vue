<template>
	<div class="wrap">
		<h1 class="title">登录表单</h1>
		<el-form
			class="login-form"
			label-width="120px"
			label-position="top"
			ref="ruleFormRef"
			:model="form"
			:rules="rules"
			size="large"
		>
			<el-form-item label="user" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="password" prop="password">
				<el-input v-model="form.password"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button
					type="primary"
					v-loading.fullscreen.lock="loading"
					element-loading-background="rgba(122, 122, 122, 0.8)"
					element-loading-text="加载数据中..."
					@click="handleClickLogin(ruleFormRef)"
					>登录</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, reactive, toRefs } from 'vue';
import { useUserStore } from '../store/modules/user';
import type { FormInstance, FormRules } from 'element-plus';

const ruleFormRef = ref<FormInstance>();

const form = reactive({
	name: 'admin',
	password: 'admin',
});

const rules = reactive<FormRules>({
	name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const router = useRouter();
const userStore = useUserStore();
let loading = ref(false);

const handleClickLogin = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate(async (valid: any) => {
		if (valid) {
			loading.value = true;
			setTimeout(() => {
				loading.value = false;
			}, 1000);
		} else {
			// console.log('error submit!', fields);
		}
	});
};
</script>

<style lang="scss" scoped>
.wrap {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.title {
		margin-bottom: 50px;
		text-align: center;
		color: #333;
		letter-spacing: 5px;
	}
	.login-form {
		margin: 0 auto;
		width: 500px;

		:deep(.el-button) {
			width: 100%;
		}

		:deep(.el-form-item__label) {
			margin-bottom: 0;
			line-height: none;
			height: none;
		}
	}
}
</style>
