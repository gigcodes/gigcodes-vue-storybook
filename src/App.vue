<script setup>
import { AcademicCapIcon } from '@heroicons/vue/24/solid'
import HelloWorld from './components/HelloWorld.vue'
import Alert from './components/ui/Alert/Alert.vue'
import Button from './components/ui/Buttons'
import './assets/styles/app.css'
import Skeleton from './components/ui/Skeleton'
import Tag from './components/ui/Tag'
import Tooltip from './components/ui/Tooltip/Tooltip.vue'
import Badge from './components/ui/Badge/Badge.vue'
import { ref } from 'vue'
import CheckBox from './components/ui/CheckBox/CheckBox.vue'
import CheckBoxGroup from './components/ui/CheckBox/CheckBoxGroup.vue'
import Switcher from './components/ui/Switcher/Switcher.vue'
import AvatarGroup from './components/ui/Avatar/AvatarGroup.vue'
import Avatar from './components/ui/Avatar/Avatar.vue'
import { Radio, RadioGroup } from './components/ui/Radio'

const checked = ref(['Selection B'])
const radio = ref('1')
const switchedChecked = ref(false)
const input = ref()
const debug = () => {
    alert('asd')
}
</script>

<template>
    <HelloWorld msg="Vite + Vue" class="iuasda" />
    <Alert show-icon closable type="success">Additional description and information about copywriting </Alert>
    <Button variant="solid" shape="none" color="blue-600" active> Click Me! </Button>
    <Button size="lg" variant="twoTone" shape="none" block color="blue-600">
        <template #icon><AcademicCapIcon class="h-4" /></template> Default</Button
    >
    <div class="flex flex-col gap-4">
        <Skeleton height="150" />
    </div>
    <Tooltip message="Hello" is-open>
        <Tag>Basic Tag</Tag>
    </Tooltip>
    <Tag prefix-class="bg-emerald-500">
        <template #prefix><AcademicCapIcon class="text-base h-4 text-blue-500 mr-1 rtl:ml-1" /> </template> Tag 2
    </Tag>
    <Badge class="mr-4 font-semibold" content="99" inner-class="bg-red-50 text-red-500" />
    <Badge class="mr-4 border border-gray-400" content="New" inner-class="bg-white text-gray-500" />
    <CheckBoxGroup v-model="checked" vertical color="yellow-500">
        <CheckBox value="Selection A" disabled>Selection A </CheckBox>
        <CheckBox value="Selection B">Selection B </CheckBox>
        <CheckBox value="Selection C">Selection C </CheckBox>
    </CheckBoxGroup>

    {{ checked }}

    <Switcher v-model="switchedChecked" color="green-500">
        <template #checked>a</template><template #unchecked>b</template>
    </Switcher>

    <div class="flex">
        <AvatarGroup
            chained
            :omitted-avatar-props="{ shape: 'circle' }"
            omitted-avatar-tooltip
            @omitted-avatar-click="debug()"
        >
            <Avatar ref="input" size="sm" shape="circle">vv</Avatar>
            <Avatar src="https://elstar.themenate.net/img/avatars/thumb-1.jpg" />
            <Avatar shape="circle bg-emerald-500">
                <template #icon><AcademicCapIcon class="h-4" /></template>
            </Avatar>
            <Avatar size="lg">
                <template #icon><AcademicCapIcon class="h-4" /></template>
            </Avatar>
        </AvatarGroup>
    </div>
    <RadioGroup v-model="radio">
        <Radio class="mr-4" value="1"> Radio </Radio>
        <Radio value="2"> Checked Radio </Radio>
    </RadioGroup>
    <!-- <Radio v-model="radio" class="mr-4" name="simpleRadioExample" value="1"> Radio </Radio>
    <Radio v-model="radio" name="simpleRadioExample" value="2"> Checked Radio </Radio> -->
    <!-- <Radio value="Apple">Apple</Radio>
        <Radio value="Banana">Banana</Radio>
        <Radio value="Cherry">Cherry</Radio> -->
    {{ radio }}
</template>
