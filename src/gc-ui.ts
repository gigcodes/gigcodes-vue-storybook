import Alert from '@/components/ui/Alert'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Buttons'
import Badge from '@/components/ui/Badge'
import Switcher from '@/components/ui/Switcher'
import Pagination from '@/components/ui/Pagination'
import StatusIcon from '@/components/ui/StatusIcon'
import Spinner from '@/components/ui/Spinner'
import Skeleton from '@/components/ui/Skeleton'
import Select from '@/components/ui/Select'
import ProgressBar from '@/components/ui/ProgressBar'
import Input from '@/components/ui/Input'
import CloseButton from '@/components/ui/CloseButton'
import Card from '@/components/ui/Card'
import { Segment, SegmentItem } from './components/ui/Segment'
import { Menu, MenuItem } from '@/components/ui/Menu'
import { Radio, RadioGroup } from '@/components/ui/Radio'
import { TabContent, TabList, TabNav, Tabs } from '@/components/ui/Tabs'
import { StepItem, Steps } from '@/components/ui/Steps'
import { TimeLine, TimeLineItem } from '@/components/ui/TimeLine'
import { InputAddon, InputGroup } from '@/components/ui/InputGroup'
import { FormContainer, FormItem } from '@/components/ui/Form'
import { Avatar, AvatarGroup } from '@/components/ui/Avatar'
import { CheckBox, CheckBoxGroup } from '@/components/ui/CheckBox'
import { Dropdown, DropdownItem, DropdownMenu } from '@/components/ui/Dropdown'
import { createToaster, Toast } from '@/components/ui/Toast'
import Notification from '@/components/ui/Notification'

import type { App } from 'vue'

import './assets/styles/app.css'

export default {
    install: (app: App) => {
        app.component('Alert', Alert)
        app.component('Segment', Segment)
        app.component('SegmentItem', SegmentItem)
        app.component('Tag', Tag)
        app.component('Button', Button)
        app.component('Tabs', Tabs)
        app.component('TabContent', TabContent)
        app.component('TabNav', TabNav)
        app.component('TabList', TabList)
        app.component('Pagination', Pagination)
        app.component('Steps', Steps)
        app.component('StepItem', StepItem)
        app.component('Switcher', Switcher)
        app.component('TimeLine', TimeLine)
        app.component('TimeLineItem', TimeLineItem)
        app.component('StatusIcon', StatusIcon)
        app.component('Spinner', Spinner)
        app.component('Skeleton', Skeleton)
        app.component('Select', Select)
        app.component('RadioGroup', RadioGroup)
        app.component('Radio', Radio)
        app.component('ProgressBar', ProgressBar)
        app.component('MenuItem', MenuItem)
        app.component('Menu', Menu)
        app.component('InputAddon', InputAddon)
        app.component('InputGroup', InputGroup)
        app.component('Input', Input)
        app.component('FormContainer', FormContainer)
        app.component('FormItem', FormItem)
        app.component('CloseButton', CloseButton)
        app.component('Avatar', Avatar)
        app.component('AvatarGroup', AvatarGroup)
        app.component('Badge', Badge)
        app.component('Card', Card)
        app.component('CheckBox', CheckBox)
        app.component('CheckBoxGroup', CheckBoxGroup)
        app.component('Dropdown', Dropdown)
        app.component('DropdownMenu', DropdownMenu)
        app.component('DropdownItem', DropdownItem)
        app.component('Toast', Toast)
        app.component('Notification', Notification)
    },
}

export {
    Alert,
    Segment,
    SegmentItem,
    Tag,
    Button,
    Tabs,
    TabContent,
    TabNav,
    TabList,
    Pagination,
    Steps,
    StepItem,
    Switcher,
    TimeLineItem,
    StatusIcon,
    Spinner,
    Skeleton,
    Select,
    Radio,
    RadioGroup,
    ProgressBar,
    MenuItem,
    Menu,
    InputAddon,
    InputGroup,
    Input,
    FormContainer,
    FormItem,
    CloseButton,
    Avatar,
    AvatarGroup,
    Badge,
    Card,
    CheckBox,
    CheckBoxGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Toast,
    createToaster,
    Notification,
}
