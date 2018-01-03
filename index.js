var input_letters = document.getElementById("letters");
var required_letters = document.getElementById("require");

var findWords = function(query,require) {
    //load a file
    //var words = {};
    //fill words with {w:w}
    return findWordsHelper("",query.toLowerCase(),words,{},require);
};

var findWordsHelper = function(front,back,words,results,require) {
    if (front.length > 1 && !(front in results) && front in words && requiredLetters(front,require)) {
	results[front] = '';
    }
    if (back.length == 0) {
	return results;
    }
    for (var i = 0; i < back.length; i++) {
	var letter = back.charAt(i);
	var new_back = back.substring(0,i) + back.substring(i+1);
	findWordsHelper(front+letter,new_back,words,results,require);
    }
    return results;
};


var requiredLetters2 = function(word,require) {
    return true;
};

var requiredLetters = function(word,require) {
    if (require == null) {
	return true;
    }
    var letter_list = [];
    for (var i = 0; i < word.length; i++) {
	letter_list.push(word.charAt(i));
    }
    for (var i = 0; i < require.length; i++) {
	if (!letter_list.includes(require.charAt(i))) {
	    return false;
	}
	letter_list.splice(letter_list.indexOf(require.charAt(i)),1);
    }
    return true;
}


document.getElementById("findWords").addEventListener("click",function() {
    var results = findWords(input_letters.value,require.value);
    var out = document.getElementById("output");
    var word_list = [];
    out.innerHTML = "";
    for (var key in results) {
	word_list.push(key);
    }
    word_list.sort(function(a,b) {
	return a.length-b.length || a.localeCompare(b);
    });
    for (var i = 0; i < word_list.length; i++) {
	out.innerHTML += ("<p>" + word_list[i].toUpperCase() + "</p>");
    }
});

/*
if len(front) > 1 and front not in results and front in words and required_letters(front,require):
        results[front] = front
    if len(back) == 0:
        return results
    for c in back: #each character in the back
        c_index = back.find(c)
        find_word_helper(front+c,back[0:c_index]+back[c_index+1:],words,results,require)
    return results


def required_letters(word,require):
    if require == None:
        return True
    copy = [c for c in word]
    for c in require:
        if c not in copy:
            return False
        copy.remove(c)
    return True
*/
