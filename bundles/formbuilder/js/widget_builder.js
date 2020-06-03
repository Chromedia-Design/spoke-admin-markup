var WidgetFormBuilder = function (options) {
    if (!options.form) {
        throw "WidgetFormBuilder requires the 'form' element option";
    }

    this.form = options.form;

    if (!options.formElements) {
        // build defaults
        this.formElements = {
            widget_id: this.form.find('select.enabled-widgets-choice'),
            widget_choices: this.form.find('.widget-choices')
        };
    }
    else {
        // TODO: validate
        this.formElements = options.formElements;
    }

    $('form[name=question_template_form]').submit(function() {
        $('select').removeAttr('disabled');
        return true;
    });
};

WidgetFormBuilder.prototype.initForm = function () {
    const self = this;

    this.formElements.widget_id.off('change').on('change', function(e) {
        e.preventDefault();
        if (WidgetUtil.isChoiceWidget($(this).val())) {
            $(self.form).on('submit', function () {
                if($(self.formElements.widget_choices).children('li').length === 0) {
                    alertify.alert("Choice should not be empty!");
                    return false;
                }
                return true
            });
            self.formElements.widget_choices.show();
            self.form.find('.add-widget-choice-trigger').show();
            self.form.find('.choices-widget-label').show();
        } else {
            self.formElements.widget_choices.hide();
            self.form.find('.add-widget-choice-trigger').hide();
            self.form.find('.choices-widget-label').hide();
            $(self.form).off('submit').on('submit', function () {
                return true
            });
        }

    });

    if(!WidgetUtil.isChoiceWidget(this.formElements.widget_id.val())){
        this.form.find(".add-widget-choice-trigger").hide();
        this.form.find(".choices-widget-label").hide();
    }

    this.populateWidgetChoices();
};

// widget choices
WidgetFormBuilder.prototype.populateWidgetChoices = function() {
    const self = this;
    const widgetChoice = this.formElements.widget_choices;

    // add events
    const addEvents = function() {
        self.form.on('click', '.add-widget-choice-trigger', function(e) {
        var choiceInput = $(self.form).find('.choice-input');
            e.preventDefault();

        var checkIfUnique = $(self.formElements.widget_choices).children('li').find('.answer-label').toArray().map(function (e) {
            return e.textContent.trim().toLowerCase();
        }).filter(function (e) {
            return e === choiceInput.val().trim().toLowerCase()
        }).length;

        if(checkIfUnique > 0) {
            alertify.alert("Answer option already exists.")
        } else {
            if(choiceInput.val().trim().length === 0){
                alertify.alert("Choice should not be empty!");
            } else {
                widgetChoice.addCollectionRow();

                const lastLi = $(self.formElements.widget_choices).find('li:last');

                $(self.formElements.widget_choices).find('li:last').find('.answer-value').text(choiceInput.val());

                choiceInput.val(null);

                $(lastLi).hide();

                setTimeout(function () {
                    $(lastLi).remove()
                }, 300);
            }
        }
        });

    };

    // initialize widget choices
    const initWidgetChoices = function() {
        if (WidgetUtil.isChoiceWidget(self.formElements.widget_id.val())) {
            widgetChoice.displayChoices();
        } else {
            widgetChoice.closest('.form-group').hide();
        }

        addEvents();
    };

    initWidgetChoices();

    return this;
};

WidgetFormBuilder.prototype.destroyBuilder = function () {
    const self = this;

    const destroyEvents = function () {
        $(self.form).unbind();
    };

    destroyEvents();

    return this;
};


// Reusable by different widget
$.fn.addCollectionRow = function(options) {
    const props = $.extend({
        'prototypeName' : '__name__'
    }, options);


    const getLargestIndex = function (children) {
        var i = 0;
        children.forEach(function (e) {
            var child = e.children[0];
            if (child) {
                i = Number(child.getAttribute('id').match(/[\d]+/)[0]) >= i ? Number(e.children[0].getAttribute('id').match(/[\d]+/)[0]) : i;
            }
        });
        return ++i;
    };

    const answerPrototype = '<div class="mb-1"><div class="row expanded bg-black20 pt-0-5 pb-0-5 border-radius-sm align-middle"><div class="columns answer-label"><p id="question_template_form_widgetMetadata_choices___name__" name="question_template_form[widgetMetadata][choices][__name__]" required="required" class="mb-0 form-group" ><strong class="answer-value"></strong></p></div><div class="pull-right"><button class="remove-widget-choice-trigger button hollow alert clear mb-0"><i class="fa fa-trash"></i></button><button class="button hollow primary clear mb-0"><i class="fa fa-pencil"></i></button><button class="button hollow clear success small mb-0"><i class="fa fa-plus"></i> Dependant</button></div></div><div class="columns shrink"></div></div>';

    const index = $(this).data('index') ? $(this).data('index') : $(this).children().length ? getLargestIndex($('.answer-label').last().get()) : 0;

    var newForm = $(WidgetUtil.replacePrototypeName(answerPrototype, props.prototypeName, index));

    var newElem = jQuery('<li class="choices-li"></li>').html(newForm);

    this.data('index', index + 1);

    newElem.appendTo($(this));

    return this;
};

$.fn.removeCollectionRow = function(options) {
    const props = $.extend({
        'onRemoveDone' : function() {},
        'isRequired' : true
    }, options);

    if (props.isRequired && $(this).parent().parent().parent().parent().siblings(':visible').length === 0) {
        alertify.alert('At least one value is required.');
    } else {
        $(this).parent().parent().parent().parent().hide().html('');
    }
};

$.fn.displayChoices = function() {
    $(this).closest('.form-group').show();
};

$.fn.removeChoices = function() {
    $(this).empty();
    $('.form-group').remove();
};

$.fn.makeTitleFromSelect = function () {
    $(this).parent().addClass('row');
    const title = $(this).children('option:selected').text();
    const button = $('<button class="remove-widget-constraint-trigger button clear hollow alert pull-right tiny">remove</button>');
    const span = $('<span><strong>' + title + '</strong></span>');
    var wrapper = $('<div class="columns medium-12"></div>');
    wrapper.append(span, button);
    $(this).parent().append(wrapper);
    $(this).hide();
};

$.fn.addLabelSuffix = function () {
    const text = $(this).text();
    const input = $(this).parent().find('input');
    const suffix = input.prop('required') ? '*' : (input.is(':hidden') ? '+' : '-');

    if (text.indexOf('-') === -1 && text.indexOf('+') === -1 && text.indexOf('*') === -1) {
        $(this).text(text + ' ' + suffix);
    } else {
        $(this).text(text.replace(/([-+*])/, suffix));
    }
};

// Provides utility methods for widgets
const WidgetUtil = (function($) {
    return {
        choiceWidgets : ['radio', 'dropdown', 'checkbox'],

        replacePrototypeName : function(prototype, prototypeName, value) {
            const regEx = new RegExp(prototypeName, 'g');

            prototype = prototype.replace(regEx, value);

            return prototype;
        },

        addButtons : function(element) {
            const classNameType = element.attr("class").replace('s-li', '');
            const removeFormButton = $('<button type="button" ><i class="fa fa-close"></i></button>');
            element.append(removeFormButton.addClass("remove-widget-"+classNameType+"-trigger pull-right remove"));
            return element;
        },

        stylizeString : function(string) {
            const result = string.replace( /([A-Z])/g, " $1" );
            return result.charAt(0).toUpperCase() + result.slice(1);
        },

        isChoiceWidget : function(widget) {
            return $.inArray(widget, this.choiceWidgets) !== -1;
        }
    }
})(jQuery);
