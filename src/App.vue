<script setup>
import { AcademicCapIcon } from '@heroicons/vue/24/solid'
import HelloWorld from './components/HelloWorld.vue'
import Skeleton from './components/ui/Skeleton'
import Tooltip from './components/ui/Tooltip/Tooltip.vue'
import Badge from './components/ui/Badge/Badge.vue'
import { ref } from 'vue'
import CheckBox from './components/ui/CheckBox/CheckBox.vue'
import CheckBoxGroup from './components/ui/CheckBox/CheckBoxGroup.vue'
import Switcher from './components/ui/Switcher/Switcher.vue'
import AvatarGroup from './components/ui/Avatar/AvatarGroup.vue'
import Avatar from './components/ui/Avatar/Avatar.vue'
import { RadioGroup } from './components/ui/Radio'
import Card from './components/ui/Card'
import { TimeLine, TimeLineItem } from './components/ui/TimeLine'
import { Segment, SegmentItem } from './components/ui/Segment'
import InputComp from '@/components/ui/Input'
import InputGroup from '@/components/ui/InputGroup/InputGroup.vue'
import InputAddon from '@/components/ui/InputGroup/InputAddon.vue'
import FormContainer from '@/components/ui/Form/FormContainer.vue'
import FormItem from '@/components/ui/Form/FormItem.vue'
import Menu from '@/components/ui/Menu/Menu.vue'
import MenuItem from '@/components/ui/Menu/MenuItem.vue'
import Alert from '@/components/ui/Alert/Alert.vue'
import Tabs from '@/components/ui/Tabs/Tabs.vue'
import TabList from '@/components/ui/Tabs/TabList.vue'
import TabNav from '@/components/ui/Tabs/TabNav.vue'
import TabContent from '@/components/ui/Tabs/TabContent.vue'
import Pagination from '@/components/ui/Pagination/Pagination.vue'
import StepItem from '@/components/ui/Steps/StepItem.vue'
import Steps from '@/components/ui/Steps/Steps.vue'
import Dropdown from '@/components/ui/Dropdown/Dropdown.vue'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem.vue'
import DropdownMenu from '@/components/ui/Dropdown/DropdownMenu.vue'

const data = ref()
const checked = ref(['Selection B'])
const radio = ref('1')
const switchedChecked = ref(false)
const input = ref()
const debug = () => {
    alert("I'm clicked")
}
const selectedValue = ref(['left'])
const tab1 = ref('tab1')
const onSelect = (e) => alert(e)
</script>

<template>
    <HelloWorld msg="Vite + Vue" class="iuasda" />
    <Alert show-icon closable type="success">Additional description and information about copywriting</Alert>
    <Button variant="solid" shape="none" color="blue-600" active>Click Me!</Button>
    <Button size="lg" variant="twoTone" shape="none" block color="blue-600">
        <template #icon>
            <AcademicCapIcon class="h-4" />
        </template>
        Default
    </Button>
    <div class="flex flex-col gap-4">
        <Skeleton height="150" />
    </div>

    <Tooltip message="Hello" is-open>
        <Tag>Basic Tag</Tag>
    </Tooltip>
    <Tag prefix-class="bg-emerald-500">
        <template #prefix>
            <AcademicCapIcon class="text-base h-4 text-blue-500 mr-1 rtl:ml-1" />
        </template>
        Tag 2
    </Tag>
    <Badge class="mr-4 font-semibold" content="99" inner-class="bg-red-50 text-red-500" />
    <Badge class="mr-4 border border-gray-400" content="New" inner-class="bg-white text-gray-500" />
    <CheckBoxGroup v-model="checked" vertical color="yellow-500">
        <CheckBox value="Selection A" disabled>Selection A</CheckBox>
        <CheckBox value="Selection B">Selection B</CheckBox>
        <CheckBox value="Selection C">Selection C</CheckBox>
    </CheckBoxGroup>

    {{ checked }}

    <Switcher v-model="switchedChecked" color="green-500">
        <template #checked>a</template>
        <template #unchecked>b</template>
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
                <template #icon>
                    <AcademicCapIcon class="h-4" />
                </template>
            </Avatar>
            <Avatar size="lg">
                <template #icon>
                    <AcademicCapIcon class="h-4" />
                </template>
            </Avatar>
        </AvatarGroup>
    </div>
    <RadioGroup v-model="radio">
        <Radio class="mr-4" value="1"> Radio</Radio>
        <Radio value="2"> Checked Radio</Radio>
    </RadioGroup>
    {{ radio }}
    <div class="max-w-xs">
        <Card
            clickable
            class="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
            header-class="p-0"
            :footer-border="false"
            :header-border="false"
            @on-card-click="debug"
        >
            <template #header>
                <div class="rounded-tl-lg rounded-tr-lg overflow-hidden">
                    <img src="https://elstar.themenate.net/img/others/img-1.jpg" alt="image" />
                </div>
            </template>
            <span class="text-emerald-600 font-semibold"> Life Style </span>
            <h4 class="font-bold my-3">Use the modern rules</h4>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's.
            </p>
            <template #footer>
                <div class="flex items-center">
                    <Avatar
                        :size="30"
                        class="mr-2"
                        shape="circle"
                        src="https://elstar.themenate.net/img/avatars/thumb-1.jpg"
                    />
                    <span>
                        <h6 class="text-sm">Kristen Fisher</h6>
                        <span class="text-xs">Sep 23, 2021</span>
                    </span>
                </div>
            </template>
        </Card>
    </div>
    <div class="max-w-[700px]">
        <TimeLine>
            <TimeLineItem>
                <template #media>
                    <Avatar :size="25" shape="circle" class="bg-amber-500"> C</Avatar>
                </template>
                <p class="my-1 flex items-center">
                    <span class="font-semibold text-gray-900 dark:text-gray-100"> Carolyn Perkins </span>
                    <span class="mx-2">has change the status to </span>
                    <Badge class="bg-emerald-500" />
                    <span class="ml-1 rtl:mr-1 font-semibold text-gray-900 dark:text-gray-100"> Completed </span>
                    <span class="ml-3 rtl:mr-3">6h ago</span>
                </p>
            </TimeLineItem>
            <TimeLineItem>
                <template #media>
                    <Avatar
                        src="https://elstar.themenate.net//img/avatars/thumb-3.jpg"
                        :size="25"
                        shape="circle"
                        class="bg-amber-500"
                    />
                </template>
                <p class="my-1 flex items-center">
                    <span class="font-semibold text-gray-900 dark:text-gray-100"> Ron Vargas </span>
                    <span class="mx-2">comment on your </span>
                    <span class="font-semibold text-gray-900 dark:text-gray-100"> Post </span>
                    <span class="ml-3 rtl:mr-3">2d ago</span>
                </p>
                <Card class="mt-4">
                    <p>
                        Fine, Java MIGHT be a good example of what a programming language should be like. But Java
                        applications are good examples of what applications SHOULDN'T be like.
                    </p>
                </Card>
            </TimeLineItem>
            <TimeLineItem>
                <template #media>
                    <Avatar :size="25" shape="circle" class="text-gray-700 bg-gray-200 dark:text-gray-100">
                        <template #icon>
                            <AcademicCapIcon class="h-4" />
                        </template>
                    </Avatar>
                </template>
                <p class="flex items-center">
                    <span class="font-semibold text-gray-900 dark:text-gray-100"> Joyce Freeman </span>
                    <span class="mx-2">added tags </span>
                    <Tag prefix-class="bg-emerald-500">
                        <template #prefix>
                            <AcademicCapIcon class="text-base h-4 text-blue-500 mr-1 rtl:ml-1" />
                        </template>
                        Tag 2
                    </Tag>
                    <Tag prefix-class="bg-emerald-500">
                        <template #prefix>
                            <AcademicCapIcon class="text-base h-4 text-blue-500 mr-1 rtl:ml-1" />
                        </template>
                        Tag 2
                    </Tag>
                    <span class="ml-3 rtl:mr-3">2d ago</span>
                </p>
            </TimeLineItem>
        </TimeLine>
    </div>
    <div class="p-20">
        <Segment v-model="selectedValue">
            <SegmentItem value="left" custom>
                <template #default="{ active }">
                    <Tag prefix-class="bg-emerald-500">
                        {{ active }}
                        <template #prefix>
                            <AcademicCapIcon class="text-base h-4 text-blue-500 mr-1 rtl:ml-1" />
                        </template>
                        Tag 2
                    </Tag>
                </template>
            </SegmentItem>
            <SegmentItem value="center">center</SegmentItem>
            <SegmentItem value="right">right</SegmentItem>
        </Segment>
        {{ selectedValue }}
    </div>
    <InputGroup class="mb-4" size="sm">
        <InputAddon>@</InputAddon>
        <InputComp v-model="data" placeholder="Basic usage">
            <template #prefix>
                <AcademicCapIcon class="h-4" />
            </template>
        </InputComp>
        <Button>Search</Button>
    </InputGroup>
    <FormContainer>
        <FormItem label="Name">
            <template #extra>
                <Tooltip message="Hello" class="p-2"> ?</Tooltip>
            </template>
            <InputComp v-model="data" placeholder="Basic usage">
                <template #prefix>
                    <AcademicCapIcon class="h-4" />
                </template>
            </InputComp>
        </FormItem>
        <FormItem>
            <Button type="submit">Submit</Button>
        </FormItem>
    </FormContainer>
    <div class="border rounded-md p-2" style="max-width: 250px">
        <Menu variant="dark" @select="onSelect">
            <MenuItem event-key="settings"> Settings</MenuItem>
            <MenuItem event-key="message"> Message</MenuItem>
            <MenuItem event-key="gallery"> Gallery</MenuItem>
        </Menu>
    </div>

    <Tabs v-model="tab1">
        <TabList>
            <TabNav value="tab1">Home</TabNav>
            <TabNav value="tab2" disabled>Profile</TabNav>
            <TabNav value="tab3">Contact</TabNav>
        </TabList>
        <div class="p-4">
            <TabContent value="tab1">
                <p>
                    If builders built buildings the way programmers wrote programs, then the first woodpecker that came
                    along would destroy civilization. (Gerald Weinberg)
                </p>
            </TabContent>
            <TabContent value="tab2">
                <p>
                    A computer lets you make more mistakes faster than any invention in human history–with the possible
                    exceptions of handguns and tequila. (Mitch Radcliffe).
                </p>
            </TabContent>
            <TabContent value="tab3">
                <p>
                    In C++ it’s harder to shoot yourself in the foot, but when you do, you blow off your whole leg.
                    (Bjarne Stroustrup)
                </p>
            </TabContent>
        </div>
    </Tabs>
    {{ data }}
    <Pagination />
    <Steps :current="1" vertical status="error">
        <StepItem title="Login" description="Login to your account" />
        <StepItem />
        <StepItem />
        <StepItem />
    </Steps>
    <Dropdown title="Click Me!">
        <DropdownItem event-key="a">Item A</DropdownItem>
        <DropdownItem event-key="b">Item B</DropdownItem>
        <DropdownItem event-key="c">Item C</DropdownItem>
        <DropdownItem event-key="d">Item D</DropdownItem>
        <DropdownMenu title="Right Item 3">
            <DropdownItem>Item 3-2</DropdownItem>
            <DropdownItem>Item 3-3</DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>
