<template>
    <view class="uni-numbox">
        <view class="uni-numbox__minus" :class="{ 'uni-numbox--disabled': disableSubtract || disabled }" @click="_calcValue('subtract')">-</view>
      <input :disabled="disabled" :value="inputValue" @blur="_onBlur" class="uni-numbox__value" type="number"/>
        <view class="uni-numbox__plus" :class="{ 'uni-numbox--disabled': disableAdd || disabled }" @click="_calcValue('add')">+</view>
    </view>
</template>
<script>
import { mapState } from "vuex";
import { SMG } from "../../utils";

export default {
    name: 'uni-number-box',
    props: {
        value: {
            type: Number,
            default: 1
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
          inputValue: this.value,
        };
    },
    computed: {
      ...mapState('User', ['userInfo', 'setting']),
        disableSubtract() {
            return this.inputValue <= this.min;
        },
        disableAdd() {
            return this.inputValue >= this.max;
        }
    },
    watch: {
        value(val) {
            this.inputValue = val;
        },
      inputValue(newVal, oldVal) {
        if (+newVal !== +oldVal) {
          this.$emit('change', newVal)
        }
      }
    },
  created() {
    this.inputValue = +this.value
  },
    methods: {
        _calcValue(type) {
            if (this.disabled) {
                return;
            }
            const scale = this._getDecimalScale();
            let value = this.inputValue * scale;
            let step = this.setting.product_num_select_setting * scale;
            if (type === 'subtract') {
                value -= step;

            } else if (type === 'add') {
                value += step;
            }

          if (value > this.max) {
            value = this.max;
            SMG('超过库存上限，不可操作')
          } else if (value < this.min) {
            value = this.min;
          }

          // if (value < this.min || value > this.max) {
          //     return;
          // }
            this.inputValue = value / scale;
        },
        _getDecimalScale() {
            let scale = 1;
            // 浮点型
            if (~~this.step !== this.step) {
                scale = Math.pow(10, (this.step + '').split('.')[1].length);
            }
            return scale;
        },
        _onBlur(event) {
            let value = event.detail.value;
            if (!value) {
                this.inputValue = 0;
                return;
            }
            value = +value;
            if (value > this.max) {
                value = this.max;
              SMG('不能超过购买数量')
            } else if (value < this.min) {
                value = this.min;
            }
            this.inputValue = value;
        }
    }
};
</script>
<style lang="scss">
$numbox-btn-width: 70upx;
$numbox-input-width: 80upx;
$numbox-height: 70upx;
$uni-font-size-xxl: 40upx;

.uni-numbox {
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    height: $numbox-height;
    position: relative;
    margin-left: 30upx;

    &:after {
        content: '';
        position: absolute;
        transform-origin: center;
        box-sizing: border-box;
        pointer-events: none;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        border: 1px solid #999;
        border-radius: 8upx;
        transform: scale(0.5);
    }

    &__minus,
    &__plus {
        margin: 0;
        width: $numbox-btn-width;
        font-size: $uni-font-size-xxl;
        height: 100%;
        line-height: $numbox-height;
        text-align: center;
        color: $uni-text-color;
        position: relative;
        
    }

    &__value {
        position: relative;
        background-color: $uni-bg-color;
        width: $numbox-input-width;
        height: 100%;
        text-align: center;
        width: 200upx;

        &:after {
            content: '';
            position: absolute;
            transform-origin: center;
            box-sizing: border-box;
            pointer-events: none;
            top: -50%;
            left: -50%;
            right: -50%;
            bottom: -50%;
            border-style: solid;
            border-color: #999;
            border-left-width: 1px;
            border-right-width: 1px;
            border-top-width: 0;
            border-bottom-width: 0;
            transform: scale(0.5);
        }
    }

    &--disabled {
        color: $uni-text-color-disable;
    }
}
</style>
